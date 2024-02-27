import Script from "next/script"

export default function WufooEmbed({ formID, initialHeight = 640 }) {
  return (
    <>
      <div id={`wufoo-${formID}`}>
        {" "}
        Please fill out my <a href={`https://fullertonfinancial.wufoo.com/forms/${formID}`}>online form</a>.{" "}
      </div>{" "}
      <Script strategy="afterInteractive" id="wufoo_form_embed">
        {`var ${formID} 
      (function(d, t) { var s = d.createElement(t), options = { 'userName':'fullertonfinancial', 'formHash':'${formID}', 'autoResize':true, 'height':'${initialHeight}', 'async':true, 'host':'wufoo.com', 'header':'show', 'ssl':true }; s.src = ('https:' == d.location.protocol ?'https://':'http://') + 'secure.wufoo.com/scripts/embed/form.js'; s.onload = s.onreadystatechange = function() { var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return; try { ${formID} = new WufooForm(); ${formID}.initialize(options); ${formID}.display(); } catch (e) { } }; var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr); })(document, 'script');`}
      </Script>
    </>
  )
}
