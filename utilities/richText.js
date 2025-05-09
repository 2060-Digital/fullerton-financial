import {
  render,
  MARK_LINK,
  MARK_TEXT_STYLE,
  NODE_HEADING,
  NODE_UL,
  NODE_OL,
  NODE_IMAGE,
  MARK_UNDERLINE,
} from "storyblok-rich-text-react-renderer"
import CallToAction from "components/CallToAction"
import cn from "classnames"
import { Components } from "components/DynamicComponent"
import { getStoryblokLink } from "./getStoryblokLink"
import React from "react"
import getSbImageDimensions from "utilities/getSbImageDimensions.ts"
import dynamic from "next/dynamic"

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
              return <Component className="rich-text-heading">{children}</Component>
            }

            // Prevents content editors from changing the font weight of headings
            let formattedChildren = children?.map((node) => {
              if (node?.type === "b") {
                return node?.props?.children
              }
              return node
            })

            return children ? (
              <Component className={cn(children[0].props.className, "rich-text-heading")}>
                {formattedChildren}
              </Component>
            ) : null
          },
          [NODE_UL]: (children) => {
            return <ul className="rich-text-ul">{children}</ul>
          },
          [NODE_OL]: (children) => {
            return <ol className="rich-text-ol">{children}</ol>
          },
          [NODE_IMAGE]: (_, { src, alt, title }) => {
            const Image = dynamic(() => import("components/Image"))
            return (
              <Image
                src={src}
                alt={alt}
                title={title}
                sizes="(max-width: 1024px) 90vw, 50vw"
                height={getSbImageDimensions("height", src)}
                width={getSbImageDimensions("width", src)}
                className="mb-4 w-full"
              />
            )
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
            return <span className="rich-text-underline">{children}</span>
          },
        },
      })
    : null
}
