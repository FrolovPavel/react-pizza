import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="124" r="122"/>
    <rect x="0" y="271" rx="10" ry="10" width="280" height="27"/>
    <rect x="0" y="313" rx="10" ry="10" width="280" height="88"/>
    <rect x="0" y="430" rx="10" ry="10" width="95" height="27"/>
    <rect x="128" y="421" rx="25" ry="25" width="152" height="45"/>
  </ContentLoader>
)

export default Skeleton
