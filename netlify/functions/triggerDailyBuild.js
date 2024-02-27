const { schedule } = require("@netlify/functions")

const BUILD_HOOK = "https://api.netlify.com/build_hooks/65de26bbfa8df41963da3bf2"

const handler = async function () {
  try {
    await fetch(BUILD_HOOK, {
      method: "POST",
    }).then(() => {
      console.info("Successful Build!")
    })
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200,
  }
}

exports.handler = schedule("@daily", handler)
