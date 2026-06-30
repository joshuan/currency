import React from 'react';
import { Text } from '@gravity-ui/uikit';

import { HeaderLink } from './Link/Link';

import './Header.css';

interface IHeaderProps {
	date: number | null;
}

export function Header({ date }: IHeaderProps) {
	return (
		<header className="Header">
			<div className="Header__Container">
				<div className="Header__Brand">
					<svg
						className="Header__LogoIcon"
						width="32"
						height="32"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="16"
							cy="16"
							r="14"
							fill="url(#logo-grad-bg)"
							stroke="url(#logo-grad-border)"
							strokeWidth="1.5"
						/>
						<path
							d="M10 13H22M22 13L18 9M22 13L18 17"
							stroke="#fbbf24"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M22 19H10M10 19L14 15M10 19L14 23"
							stroke="#f59e0b"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<defs>
							<linearGradient
								id="logo-grad-bg"
								x1="0"
								y1="0"
								x2="32"
								y2="32"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#1e293b" />
								<stop offset="1" stopColor="#0f172a" />
							</linearGradient>
							<linearGradient
								id="logo-grad-border"
								x1="0"
								y1="0"
								x2="32"
								y2="32"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#fbbf24" />
								<stop offset="1" stopColor="#d97706" />
							</linearGradient>
						</defs>
					</svg>
					<div className="Header__TitleGroup">
						<span className="Header__TitleBrand">Apex</span>
						<span className="Header__TitleSub">Currency Processor</span>
					</div>
				</div>

				{date !== null && (
					<div className="Header__Right">
						<HeaderLink />
						<div className="Header__Status">
							<span className="Header__StatusDot" />
							<Text className="Header__Date" variant="code-1">
								{new Date(date).toLocaleString()}
							</Text>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
