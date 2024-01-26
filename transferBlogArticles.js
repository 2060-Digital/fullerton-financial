const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fs = require("fs")
const { Readable } = require("stream")
const { finished } = require("stream/promises")

const links = [
  "how-annuities-fit-into-your-retirement-savings-plan",
  "alternative-investment-vehicles-for-phoenix-retirement-savers",
  "the-five-asset-classes-of-investment",
  "investing-habits-for-success-strategies-for-building-long-term-wealth",
  "strategies-to-avoid-unwanted-debts",
  "eight-steps-to-prioritize-your-finances-as-you-head-toward-retirement",
  "what-does-diversifying-your-retirement-portfolio-mean-for-your-retirement-plans",
  "what-is-the-great-wealth-transfer",
  "do-you-need-a-financial-planner-or-a-retirement-planner",
  "how-to-start-planning-for-healthcare-costs-in-retirement",
  "retirement-planning-for-small-business-owners-five-planning-strategies-for-the-future",
  "how-can-a-divorce-impact-your-finances-and-your-credit",
  "everything-the-younger-generation-should-know-before-starting-a-401-k",
  "can-delaying-your-retirement-actually-benefit-you",
  "what-is-an-etf-and-how-can-they-help-or-hurt-your-portfolio",
  "how-do-i-claim-gambling-winnings-and-losses-on-my-taxes",
  "ways-to-maximize-your-tax-savings-when-approaching-and-in-retirement",
  "tax-guides-for-phoenix-retirees",
  "checklists-for-tax-day-2023",
  "how-prepared-are-you-for-retirement",
  "empowering-women-in-retirement",
  "what-when-who-and-how-the-social-security-decision",
  "what-are-the-different-stock-exchanges-in-the-us",
  "establishing-an-estate-plan",
  "three-pillars-of-a-successful-retirement",
  "eight-retirement-mistakes-to-avoid",
  "products-to-leverage-for-a-successful-retirement",
  "traditional-401-k-allocation-options",
  "what-does-it-mean-to-be-a-beneficiary",
  "should-you-use-your-employer-sponsored-retirement-savings-plan",
  "three-reasons-to-get-a-second-opinion-on-your-retirement-planning",
  "what-kinds-of-stocks-are-known-for-paying-dividends",
  "what-is-futures-trading",
  "what-is-a-stock-buyback-or-a-stock-split",
  "how-envisioning-your-retirement-helps-with-creating-a-plan",
  "how-to-build-wealth-after-retirement",
  "how-to-protect-your-assets-from-inflation",
  "misconceptions-about-annuities",
  "what-are-the-four-primary-types-of-annuities",
  "whats-the-difference-between-life-insurance-and-annuities",
  "ages-35-50-and-65-how-much-should-i-have-saved",
  "what-are-annuities-and-how-do-they-work",
  "why-the-sba-and-sbic-are-important-for-small-businesses",
  "weighing-the-pros-and-cons-of-revocable-vs-irrevocable-trusts",
  "the-benefits-of-an-llc-and-how-one-can-impact-business-finances",
  "why-youre-never-too-young-to-start-thinking-about-estate-planning",
  "what-are-the-benefits-of-a-529-account",
  "what-are-differences-between-equity-trading-and-bond-trading",
  "spending-habits-to-retire-as-a-millionaire",
  "the-comparative-tax-advantages-of-growth-stocks-and-dividend-stocks",
  "is-a-roth-ira-or-a-traditional-ira-better",
  "what-is-tactical-asset-allocation-and-how-does-it-help-your-investment-strategy",
  "sports-betting-is-now-legal-in-arizona-do-you-have-to-pay-taxes-on-gambling-winnings",
  "what-is-an-nft-and-are-they-good-for-your-investments",
  "whats-the-difference-between-a-bull-market-and-a-bear-market",
  "when-is-the-right-age-to-begin-investing-in-your-future",
  "how-to-keep-a-college-student-on-budget",
  "bonds-financial-bonds-what-are-they-and-how-can-you-utilize-them",
  "can-i-get-a-credit-card-and-build-credit-if-my-score-is-low",
  "how-to-teach-your-children-to-be-financially-responsible-from-an-early-age",
  "is-there-a-way-to-negotiate-lower-interest-rates-with-creditors",
  "understanding-401k-and-the-affects-it-has-on-your-financial-future",
  "how-to-financially-prepare-for-a-baby",
  "its-tax-season-do-taxes-affect-your-financial-portfolio",
  "monthly-budgeting-practical-budget-cutting-that-helps-you-save-money",
  "financial-tips-and-tricks-to-use-when-buying-a-house-or-signing-a-mortgage",
  "deciding-who-should-inherit-your-wealth-when-you-die",
  "what-is-the-right-age-to-begin-investing-in-your-future",
  "how-to-build-wealth",
  "should-bitcoin-be-in-your-retirement-portfolio",
  "is-it-possible-copper-will-be-more-important-for-the-future-than-precious-metals",
  "how-do-higher-interest-rates-impact-your-portfolios-growth",
  "what-happens-to-my-stocks-and-bonds-when-i-die",
  "why-is-americas-stock-exposure-at-historic-highs",
  "is-gold-still-a-reliable-strategic-asset-for-your-portfolio",
  "should-you-retire-with-high-yield-dividend-equities-in-your-portfolio",
  "whats-the-difference-between-a-traditional-ira-roth-ira-and-rollover-ira",
  "what-are-the-differences-between-stocks-and-bonds",
  "most-popular-wealth-storage-options",
  "the-path-to-a-net-zero-economy",
  "preparing-for-retirement-in-the-next-10-years",
  "blind-spots-in-retirement",
  "budgeting-in-retirement",
  "whats-the-point-of-an-annuity",
  "using-life-insurance-to-fund-your-retirement",
  "3-things-women-near-retirement-need-to-hear",
  "plan-for-the-unexpected",
  "retiring-debt-free",
  "millionaire-habits",
  "why-determining-your-risk-tolerance-can-mean-a-brighter-financial-future",
  "investment-vehicles-blog",
  "estate-planning-101-why-estate-plans-matter",
  "estate-planning-101-the-basics",
  "who-do-i-talk-to-about-taxes",
  "avoid-losing-your-retirement-to-taxes",
  "love-your-kids-but-be-loyal-to-your-retirement",
  "8-ways-couples-can-plan-for-retirement-together",
  "up-your-investment-strategy-by-setting-retirement-goals-that-work",
  "6-factors-will-decide-how-much-you-need-to-save-for-retirement",
  "4-reasons-you-should-be-working-with-a-financial-advisor-right-now",
  "income-ideas-for-retiring-early",
  "will-you-be-able-to-afford-in-home-long-term-care",
]

const testLinks = [
  "am-i-allowed-to-have-other-insurance-while-on-medicare",
  "who-is-usually-eligible-for-medicare",
  "what-exactly-is-medicare",
  "teaching-kids-about-debt-understanding-borrowing-and-interest-rates",
  "trusts-and-other-tools-you-can-use-to-protect-your-familys-wealth",
]

const usedLinks = [
  "investment-sectors-to-watch-in-2024",
  "can-i-keep-my-current-doctor-when-i-transition-to-medicare",
  "what-is-not-covered-by-medicare",
  "what-are-the-differences-between-medicaid-and-medicare",
  "why-you-should-look-at-optimizing-your-portfolio-for-2024",
]

async function transferArticleToStoryblok(slug) {
  const originalArticle = await fetch(`https://www.fullertonfp.com/blog/${slug}`, {
    headers: {
      "Content-Type": "text/html",
    },
  }).then((res) => res.text())

  const dom = new JSDOM(originalArticle)

  const title = dom.window.document.querySelector("h1").textContent.replaceAll("\n", "")

  const date = new Date(
    dom.window.document.querySelector("h1 + .dmNewParagraph").textContent.replace("Fullerton Financial • ", ""),
  )

  const formattedDate = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")} 00:00`

  const bodyContent = Array.from(
    dom.window.document.querySelectorAll("#dm_content .dmRespColsWrapper > .dmRespCol > .dmNewParagraph >*"),
  )
    .filter((el) => el.textContent !== "")
    .map((el) => {
      if (el.tagName === "UL") {
        const listItems = Array.from(el.children)

        return {
          type: "bullet_list",
          content: listItems.map((item) => ({
            type: "list_item",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: item.textContent,
                    type: "text",
                  },
                ],
              },
            ],
          })),
        }
      }

      if (el.tagName === "OL") {
        const listItems = Array.from(el.children)

        return {
          type: "ordered_list",
          attrs: {
            order: 1,
          },
          content: listItems.map((item) => ({
            type: "list_item",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: item.textContent,
                    type: "text",
                  },
                ],
              },
            ],
          })),
        }
      }

      if (
        el.tagName === "P" ||
        el.tagName === "DIV" ||
        el.tagName === "SPAN" ||
        el.tagName === "BLOCKQUOTE" ||
        el.tagName === "I"
      ) {
        return {
          type: "paragraph",
          content: [
            {
              text: el.textContent.replaceAll("\n", ""),
              type: "text",
            },
          ],
        }
      }

      if (el.tagName === "H1") {
        return {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              text: el.textContent.replaceAll("\n", ""),
              type: "text",
            },
          ],
        }
      }

      if (["H2", "H3", "H4", "H5", "H6"].includes(el.tagName)) {
        const headingLevel = parseInt(el.tagName.replace("H", ""))

        return {
          type: "heading",
          attrs: {
            level: headingLevel,
          },
          content: [
            {
              text: el.textContent.replaceAll("\n", ""),
              type: "text",
            },
          ],
        }
      }

      if (el.tagName === "A") {
        return {
          type: "paragraph",
          content: [
            {
              text: el.textContent,
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: el.href,
                    uuid: null,
                    anchor: null,
                    target: "_self",
                    linktype: "url",
                  },
                },
              ],
            },
          ],
        }
      }

      if (el.tagName === "SUP") {
        return {
          type: "paragraph",
          content: [
            {
              text: el.textContent,
              type: "text",
              marks: [
                {
                  type: "superscript",
                },
              ],
            },
          ],
        }
      }

      return { tag: el.tagName, text: el.textContent.replaceAll("\n", "") }
    })

  const story = {
    story: {
      name: title,
      slug: slug,
      parent_id: 499082,
      content: {
        component: "blog_article",
        title: title,
        date: formattedDate,
        category: [],
        content: {
          type: "doc",
          content: bodyContent,
        },
        seo: {
          title: title,
          plugin: "seo_metatags",
          og_image: "",
          og_title: title,
          description: "",
          twitter_image: "",
          twitter_title: title,
          og_description: "",
          twitter_description: "",
        },
      },
    },
  }

  const image = Array.from(dom.window.document.querySelectorAll("#dm_content .imageWidget img")).map(async (el) => {
    await downloadFile(el.src, `${process.cwd()}/public/blog/${slug}.jpg`)
  })

  try {
    fetch(`https://api-us.storyblok.com/v1/spaces/${process.env.SPACE_ID}/stories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.STORYBLOK_OAUTH_TOKEN,
      },
      body: JSON.stringify(story),
    })
  } catch (error) {
    console.error(error)
  }
}

async function downloadFile(url, destination) {
  const res = await fetch(url)
  if (!fs.existsSync(destination)) {
    const fileStream = fs.createWriteStream(destination, { flags: "wx" })
    await finished(Readable.fromWeb(res.body).pipe(fileStream))
  }
}

testLinks.map(async (slug) => await transferArticleToStoryblok(slug))
