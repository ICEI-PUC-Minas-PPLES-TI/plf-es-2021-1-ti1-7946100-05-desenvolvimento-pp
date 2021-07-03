function Icon({ animated, size }) {
  let svgSize = (size ?? 200) + ""
  const dLogo =
  "m 29.020918,121.31966 c -0.03106,-13.68152 15.624838,-18.41689 23.641289,-10.20363 0.004,0.80342 -1.452961,1.86054 -1.858135,1.27069 -12.313715,-9.03608 -20.359134,3.79721 -19.677311,8.62653 0.08781,6.98294 7.158506,14.42346 16.670544,10.61267 -6.427571,-0.41853 -6.242494,0.0102 -6.184442,-1.45907 0.06425,-1.37442 -0.227092,-0.92149 9.27474,-0.85534 0.290332,-0.36898 0.580661,-0.73795 0.870991,-1.10693 -10.631081,-0.29243 -10.072857,0.0383 -10.099618,-1.21095 0.07331,-1.49434 -0.571887,-1.10346 11.280372,-1.10346 0.144673,-0.36795 0.284394,-0.74223 0.392521,-1.12002 -12.482459,-0.28337 -11.681048,0.12869 -11.633099,-1.1442 0.02857,-1.45179 -0.965731,-0.91234 12.061828,-1.16321 -0.04225,-0.36696 -0.08449,-0.73392 -0.12674,-1.10088 -12.063821,-0.21387 -11.969739,0.12266 -11.974808,-1.11236 0.0363,-1.36516 -0.588472,-0.9499 7.094321,-0.95307 l 7.09432,0.0529 c 0.414105,10.10894 -4.667712,15.18061 -13.635745,15.49155 -5.918451,-0.26362 -13.132648,-4.93328 -13.191028,-13.52122 z"
  const dList0 =
  "m 29.020918,121.31966 c -0.03106,-13.68152 15.624838,-18.41689 23.641289,-10.20363 0.004,0.80342 -1.452961,1.86054 -1.858135,1.27069 -12.313715,-9.03608 -20.359134,3.79721 -19.677311,8.62653 0.08781,6.98294 7.158506,14.42346 16.670544,10.61267 0.683106,-0.35238 1.113059,-0.61251 1.865642,-1.02345 0.494198,-0.43184 0.817876,-0.81141 1.224656,-1.29096 0.290332,-0.36898 0.580661,-0.73795 0.870991,-1.10693 -10.631081,-0.29243 -10.072857,0.0383 -10.099618,-1.21095 0.07331,-1.49434 -0.571887,-1.10346 11.280372,-1.10346 0.144673,-0.36795 0.284394,-0.74223 0.392521,-1.12002 -12.482459,-0.28337 -11.681048,0.12869 -11.633099,-1.1442 0.02857,-1.45179 -0.965731,-0.91234 12.061828,-1.16321 -0.04225,-0.36696 -0.08449,-0.73392 -0.12674,-1.10088 -12.063821,-0.21387 -11.969739,0.12266 -11.974808,-1.11236 0.0363,-1.36516 -0.588472,-0.9499 7.094321,-0.95307 l 7.09432,0.0529 c 0.414105,10.10894 -4.667712,15.18061 -13.635745,15.49155 -5.918451,-0.26362 -13.132648,-4.93328 -13.191028,-13.52122 z"
  const dList1 =
  "m 29.020918,121.31966 c -0.03106,-13.68152 15.624838,-18.41689 23.641289,-10.20363 0.004,0.80342 -1.452961,1.86054 -1.858135,1.27069 -12.313715,-9.03608 -20.359134,3.79721 -19.677311,8.62653 0.08781,6.98294 7.158506,14.42346 16.670544,10.61267 0.683106,-0.35238 1.113059,-0.61251 1.865642,-1.02345 0.494198,-0.43184 0.817876,-0.81141 1.224656,-1.29096 0.290332,-0.36898 0.580661,-0.73795 0.870991,-1.10693 0.134153,-0.34204 0.361648,-0.62316 0.616007,-1.06212 0.172529,-0.35333 0.370691,-0.85541 0.564747,-1.25229 0.144673,-0.36795 0.284394,-0.74223 0.392521,-1.12002 -12.482459,-0.28337 -11.681048,0.12869 -11.633099,-1.1442 0.02857,-1.45179 -0.965731,-0.91234 12.061828,-1.16321 -0.04225,-0.36696 -0.08449,-0.73392 -0.12674,-1.10088 -12.063821,-0.21387 -11.969739,0.12266 -11.974808,-1.11236 0.0363,-1.36516 -0.588472,-0.9499 7.094321,-0.95307 l 7.09432,0.0529 c 0.414105,10.10894 -4.667712,15.18061 -13.635745,15.49155 -5.918451,-0.26362 -13.132648,-4.93328 -13.191028,-13.52122 z"
  const dList2 =
  "m 29.020918,121.31966 c -0.03106,-13.68152 15.624838,-18.41689 23.641289,-10.20363 0.004,0.80342 -1.452961,1.86054 -1.858135,1.27069 -12.313715,-9.03608 -20.359134,3.79721 -19.677311,8.62653 0.08781,6.98294 7.158506,14.42346 16.670544,10.61267 0.683106,-0.35238 1.113059,-0.61251 1.865642,-1.02345 0.494198,-0.43184 0.817876,-0.81141 1.224656,-1.29096 0.290332,-0.36898 0.580661,-0.73795 0.870991,-1.10693 0.134153,-0.34204 0.361648,-0.62316 0.616007,-1.06212 0.172529,-0.35333 0.370691,-0.85541 0.564747,-1.25229 0.144673,-0.36795 0.284394,-0.74223 0.392521,-1.12002 0,0 0.159056,-0.5493 0.289687,-1.07805 0.09472,-0.45961 0.109139,-0.81313 0.139042,-1.22936 -0.04225,-0.36696 -0.08449,-0.73392 -0.12674,-1.10088 -12.063821,-0.21387 -11.969739,0.12266 -11.974808,-1.11236 0.0363,-1.36516 -0.588472,-0.9499 7.094321,-0.95307 l 7.09432,0.0529 c 0.414105,10.10894 -4.667712,15.18061 -13.635745,15.49155 -5.918451,-0.26362 -13.132648,-4.93328 -13.191028,-13.52122 z"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgSize}
      height={svgSize}
      viewBox="0 0 40 40"
      version="1.1"
      id="svg8"
    >
      <g className="Layer 1" transform="translate(-35,-140)">
        <path
          style={{
            fill: "#cd8f32",
            stroke: "#cd8f32",
            strokeDasharray: "302",
            strokeWidth: "0.3px",
            fillOpacity: 1,
            transform: 'scale(1.32)'
          }}
          d={dList2}
          id="path837-6"
        >
          <animate
            attributeName="d"
            values={dList2 + ";" + dList1 + ";" +dList0 + ";" +dLogo}
            dur="1.6s"
            id="svg-logo-listing"
            fill="freeze"
            // begin="0.5s"
            repeatCount="2"
          />
        </path>
      </g>
    </svg>
  )
}

export default Icon
