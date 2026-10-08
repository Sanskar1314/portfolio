import { test, expect, type Page } from "@playwright/test";
const errors: string[] = [];
test.beforeEach(async ({ page }) => {
  errors.length = 0;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
});
async function open(page: Page) {
  await page.goto("/");
  await expect(
    page.locator('.cinematic-mode canvas[data-ready="true"]'),
  ).toBeVisible();
}
async function jump(page: Page, id: string, offset = 30) {
  await page.evaluate(
    ({ id, offset }) => {
      const target = document.getElementById(id)!;
      scrollTo({ top: target.offsetTop + offset, behavior: "instant" });
    },
    { id, offset },
  );
  await expect(page.locator(`#${id} .scene-content`)).toBeVisible();
  await expect(page.locator(`#${id} .scene-content`)).not.toHaveAttribute(
    "inert",
    "",
  );
}
test("loads the real-time universe and local assets without console errors", async ({
  page,
}) => {
  await open(page);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "SANSKAR",
  );
  expect(
    await page
      .locator(".hero-portrait img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBeTruthy();
  for (const path of [
    "/images/astronaut.webp",
    "/images/planet-ocean.webp",
    "/credits.html",
    "/favicon.svg",
  ])
    expect((await page.request.get(path)).ok()).toBeTruthy();
  expect(errors).toEqual([]);
});
test("navigation updates the shared timeline and backward scrolling restores the hero", async ({
  page,
}) => {
  await open(page);
  for (const [name, id] of [
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "work"],
    ["Experience", "experience"],
    ["Contact", "contact"],
  ]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page.locator(`#${id} .scene-content`)).toBeVisible();
    await expect(page.locator(`#${id} .scene-content`)).not.toHaveAttribute(
      "inert",
      "",
    );
  }
  await jump(page, "top", 0);
  await expect(page.locator(".flight-position")).toContainText("Departure", {
    ignoreCase: true,
  });
  expect(errors).toEqual([]);
});
test("skill worlds are keyboard operable and reveal the selected technologies", async ({
  page,
}) => {
  await open(page);
  await jump(page, "skills");
  const button = page.getByRole("button", { name: "AI / ML", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".skill-readout")).toContainText("PyTorch");
});
test("project disclosures and source links work", async ({ page }) => {
  await open(page);
  await jump(page, "work");
  await page.locator("#work summary").click();
  await expect(page.locator("#work details")).toHaveAttribute("open", "");
  await expect(page.locator("#work li").first()).toContainText("TF-IDF");
  await expect(page.locator("#work .pill-link")).toHaveAttribute(
    "href",
    "https://github.com/Sanskar1314/Movie_Recommendation_End_to_End",
  );
});
test("reading mode preserves access to projects and switches back to the journey", async ({
  page,
}) => {
  await open(page);
  await jump(page, "work");
  await page.getByRole("button", { name: "Read portfolio" }).click();
  await expect(page.locator(".reader-mode")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#work")).toBeInViewport();
  await page.getByRole("button", { name: "Enter space" }).click();
  await expect(page.locator("canvas")).toBeVisible();
});
test("pause control freezes idle animation without disabling navigation", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(
    page.getByRole("button", { name: "Resume motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await jump(page, "contact", 600);
  await expect(page.locator("#contact .pill-link")).toHaveAttribute(
    "href",
    "mailto:sanskargupta1314@gmail.com",
  );
});
test("mobile navigation, skills and final contact fit without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Skills", exact: true })
    .click();
  await expect(page.locator("#skills .scene-content")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Toggle navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Data Science", exact: true }).click();
  await expect(page.locator(".skill-readout")).toContainText("Pandas");
  for (const id of ["work", "experience", "achievements", "contact"]) {
    await jump(page, id, 150);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test("reduced motion renders a complete portfolio without loading WebGL", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".reader-mode")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#work h2")).toContainText("MovieMind");
  await expect(page.locator(".reader-skills")).toContainText("Python");
});
test("WebGL context loss falls back to readable content", async ({ page }) => {
  await open(page);
  await page
    .locator("canvas")
    .evaluate((canvas) =>
      canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
    );
  await expect(page.locator(".reader-mode")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("3D unavailable");
});
test("no JavaScript still exposes portfolio content and contact links", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000");
  await expect(page.locator(".reader-mode")).toBeVisible();
  await expect(page.locator("#work h2")).toBeVisible();
  await expect(page.locator("#contact .pill-link")).toBeVisible();
  await context.close();
});

test("small phone scenes and expanded credentials remain vertically accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await open(page);
  await jump(page, "achievements", 150);
  const panel = page.locator("#achievements .scene-content");
  await page.locator("#achievements summary").click();
  expect(
    await panel.evaluate((el) => el.scrollHeight >= el.clientHeight),
  ).toBeTruthy();
  await page
    .locator("#achievements .credentials p")
    .last()
    .scrollIntoViewIfNeeded();
  await expect(
    page.locator("#achievements .credentials p").last(),
  ).toBeInViewport();
  await jump(page, "sigmalearn", 100);
  await expect(page.locator("#sigmalearn .live-link")).toHaveAttribute(
    "href",
    "https://sigmalearn-ai.vercel.app",
  );
});

test("chapter boundaries blend continuously while keeping one persistent suit", async ({
  page,
}) => {
  await page.setViewportSize({ width: 662, height: 771 });
  await open(page);
  await page.getByRole("button", { name: "Pause motion" }).click();
  const samples = [];
  for (const p of [0.075, 0.08, 0.085]) {
    await page.evaluate(
      (p) =>
        scrollTo({
          top: (document.documentElement.scrollHeight - innerHeight) * p,
          behavior: "instant",
        }),
      p,
    );
    await expect
      .poll(async () =>
        Number(await page.locator(".traveler").getAttribute("data-progress")),
      )
      .toBeCloseTo(p, 3);
    samples.push(
      await page.evaluate(() => ({
        hero: parseFloat(
          getComputedStyle(document.querySelector("#top .scene-content")!)
            .opacity,
        ),
        launch: parseFloat(
          getComputedStyle(document.querySelector("#launch .scene-content")!)
            .opacity,
        ),
        traveler: document.querySelector(".traveler")!.getBoundingClientRect()
          .height,
      })),
    );
  }
  expect(samples[0].hero).toBeGreaterThan(samples[1].hero);
  expect(samples[1].hero).toBeGreaterThan(samples[2].hero);
  expect(samples[0].launch).toBeLessThan(samples[1].launch);
  expect(samples[1].launch).toBeLessThan(samples[2].launch);
  expect(samples[1].hero).toBeGreaterThan(0.1);
  expect(samples[1].launch).toBeGreaterThan(0.1);
  expect(Math.abs(samples[2].traveler - samples[0].traveler)).toBeLessThan(120);
  await expect(page.locator(".traveler")).toHaveCount(1);
  await expect(page.locator("canvas")).toHaveAttribute(
    "data-traveler-3d",
    "true",
  );
});

test("feedback viewport keeps skill selectors and project content readable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 662, height: 771 });
  await open(page);
  await jump(page, "skills", 500);
  await expect(page.locator(".skill-selectors")).toBeInViewport();
  await expect(page.locator(".skill-readout")).toBeInViewport();
  await page.getByRole("button", { name: "AI / ML", exact: false }).click();
  await expect(page.locator(".skill-readout")).toContainText("PyTorch");
  await jump(page, "sigmalearn", 400);
  await expect(page.locator("#sigmalearn .live-link")).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("direct chapter URLs settle beyond the crossfade on phones", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#sigmalearn");
  await expect(
    page.locator('.cinematic-mode canvas[data-ready="true"]'),
  ).toBeVisible();
  await expect
    .poll(async () =>
      Number(
        await page
          .locator("#sigmalearn .scene-content")
          .evaluate((el) => getComputedStyle(el).opacity),
      ),
    )
    .toBeGreaterThan(0.99);
  await expect
    .poll(async () =>
      Number(
        await page
          .locator("#work .scene-content")
          .evaluate((el) => getComputedStyle(el).opacity),
      ),
    )
    .toBeLessThan(0.001);
});

test("3D traveler moves forward without changing its screen lane", async ({
  page,
}) => {
  await open(page);
  const poses: { x: number; z: number }[] = [];
  for (const p of [0.18, 0.31, 0.51, 0.9]) {
    await page.evaluate(
      (p) =>
        scrollTo({
          top: (document.documentElement.scrollHeight - innerHeight) * p,
          behavior: "instant",
        }),
      p,
    );
    await expect
      .poll(async () =>
        Number(await page.locator(".traveler").getAttribute("data-progress")),
      )
      .toBeCloseTo(p, 3);
    poses.push(
      await page
        .locator("canvas")
        .evaluate((c) => ({
          x: Number(c.getAttribute("data-traveler-x")),
          z: Number(c.getAttribute("data-traveler-z")),
        })),
    );
  }
  expect(new Set(poses.map((p) => p.x)).size).toBe(1);
  for (let i = 1; i < poses.length; i++)
    expect(poses[i].z).toBeLessThan(poses[i - 1].z);
});

test("focused skills preserve every category and its tools", async ({
  page,
}) => {
  await page.goto("/#skills");
  await expect(page.locator("#skills .scene-content")).not.toHaveAttribute(
    "inert",
    "",
  );
  for (const label of [
    "Languages",
    "AI / ML",
    "NLP & LLMs",
    "Tools & Frameworks",
    "Data Science",
  ]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".skill-readout h3")).toHaveText(label);
    await expect(page.locator(".skill-tools span").first()).toBeVisible();
    await page.locator(".skill-description summary").click();
    await expect(page.locator(".skill-description p")).toBeVisible();
  }
});
