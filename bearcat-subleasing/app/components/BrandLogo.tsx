import Image from "next/image";

interface Props {
	size: number;
}

// Both variants render so the swap is pure CSS — no client JS, no flash
// when the theme resolves on load.
export default function BrandLogo({ size }: Props) {
	return (
		<>
			<Image
				src="/BC_LOGO.png"
				alt="Bearcat Subleasing"
				width={size}
				height={size}
				className="shrink-0 rounded-lg dark:hidden"
			/>
			<Image
				src="/bearcat_logo_dark_mode.png"
				alt="Bearcat Subleasing"
				width={size}
				height={size}
				className="hidden shrink-0 rounded-lg dark:block"
			/>
		</>
	);
}
