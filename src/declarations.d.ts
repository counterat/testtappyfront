declare module '.scss' {
	const styles: { [className: string]: string };
	export default styles;
}
declare module '.jpg';
declare module '.jpeg';
declare module '.png';
declare module '@tonconnect/ui-react' {
	export const TonConnectButton: React.FC;
	export const TonConnectUIProvider: React.FC<{ manifestUrl: string }>;
  }
  