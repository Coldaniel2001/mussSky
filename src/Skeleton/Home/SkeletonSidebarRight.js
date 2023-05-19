import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonSidebarRight = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={800}
    viewBox="0 0 280 800"
    backgroundColor="#7239e537"
    foregroundColor="#7239e537"
    {...props}
  >

    <rect x="45" y="54" rx="10" ry="10" width="200" height="50"/>
    
    <rect x="5" y="142" rx="10" ry="10" width="253" height="636" />
  </ContentLoader>
)

export default SkeletonSidebarRight





