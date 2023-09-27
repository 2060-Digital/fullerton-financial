import { render, MARK_LINK, NODE_HEADING } from "storyblok-rich-text-react-renderer"
import CallToAction from "components/CallToAction"
import cn from "classnames"
import { Components } from "components/DynamicComponent"
import { getStoryblokLink } from "./getStoryblokLink"
import React from "react"

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
        defaultBlokResolver: (name, props) => (
          <div>
            <strong className="text-red-500">Missing blok resolver for blok type {`"${name}"`}.</strong>
            <pre>
              <code>{JSON.stringify(props, undefined, 2)}</code>
            </pre>
          </div>
        ),
        nodeResolvers: {
          // properly resolve styles
          [NODE_HEADING]: (children, { level }) => {
            const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"]
            const Component = Tag[level - 1]
            if (children && typeof children[0] === "string") {
              return <Component>{children}</Component>
            }

            return children ? (
              <Component className={cn(children[0].props.className)}>{children[0].props.children}</Component>
            ) : null
          },
        },
        markResolvers: {
          [MARK_LINK]: (children, link) => {
            return (
              <CallToAction href={getStoryblokLink(link)} style="secondary">
                {children}
              </CallToAction>
            )
          },
        },
      })
    : null
}
