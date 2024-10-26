function ScrewsIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_32_10426)">
				<circle cx="12" cy="12" r="7" fill="url(#paint0_linear_32_10426)" />
			</g>
			<defs>
				<filter
					id="filter0_d_32_10426"
					x="5"
					y="5"
					width="14"
					height="16"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_32_10426"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_32_10426"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_32_10426"
					x1="12"
					y1="5"
					x2="12"
					y2="19"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#D9D9D9" />
					<stop offset="1" stopColor="#737373" />
				</linearGradient>
			</defs>
		</svg>
	);
}

export default ScrewsIcon;
