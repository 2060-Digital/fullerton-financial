import {
  render,
  MARK_LINK,
  NODE_HEADING,
  MARK_TEXT_STYLE,
  MARK_UNDERLINE,
  NODE_UL,
  NODE_OL,
} from "storyblok-rich-text-react-renderer"
import CallToAction from "components/CallToAction"
import cn from "classnames"
import { Components } from "components/DynamicComponent"
import { getStoryblokLink } from "./getStoryblokLink"
import React from "react"
import slugify from "slugify"

export default function richText(content) {
  const blokResolvers = Object.keys(Components).reduce((blokResolvers, name) => {
    blokResolvers[name] = (props) => {
      const { children, className } = props
      const Component = Components[name]
      return (
        <Component blok={props} className={className}>
          {children}
        </Component>
      )
    }

    return blokResolvers
  }, {})

  return content
    ? render(content, {
        blokResolvers,
        defaultBlokResolver: (name, props) => {
          console.error(`Missing blok resolvers for ${name}:\n
          ${JSON.stringify(props)}
          `)
          return null
        },
        nodeResolvers: {
          // properly resolve styles
          [NODE_HEADING]: (children, { level }) => {
            const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"]
            const Component = Tag[level - 1]
            if (children && typeof children[0] === "string") {
              return (
                <Component
                  id={slugify(children.join(), {
                    lower: true,
                  })}
                  className="rich-text-heading"
                >
                  {children}
                </Component>
              )
            }

            return children ? (
              <Component
                id={
                  children?.length > 0 && typeof children[0]?.props?.children === "string"
                    ? slugify(children[0]?.props?.children, {
                        lower: true,
                      })
                    : undefined
                }
                className={cn(children[0].props.className, "rich-text-heading")}
              >
                {children[0].props.children}
              </Component>
            ) : null
          },
          [NODE_UL]: (children) => {
            return <ul className="rich-text-ul">{children}</ul>
          },
          [NODE_OL]: (children) => {
            return <ol className="rich-text-ol">{children}</ol>
          },
        },
        markResolvers: {
          [MARK_LINK]: (children, link) => {
            return (
              <CallToAction href={getStoryblokLink(link)} style="inline">
                {children}
              </CallToAction>
            )
          },
          // Prevents content editors from setting a custom text color
          [MARK_TEXT_STYLE]: (children) => {
            return children
          },

          [MARK_UNDERLINE]: (children) => {
            return <span className="rich-text-underline font-secondary">{children}</span>
          },
        },
      })
    : null
}
