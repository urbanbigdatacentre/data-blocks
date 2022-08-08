// CookiesBanner.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import {CookiesBanner} from "../components";

export default {
    title: 'CookiesBanner',
    component: CookiesBanner,
} as ComponentMeta<typeof CookiesBanner>;

export const CCTV: ComponentStory<typeof CookiesBanner> = () => <CookiesBanner color={"#1D0332"}/>;
export const WaterproofingData: ComponentStory<typeof CookiesBanner> = () => <CookiesBanner color={"#2196F3"}/>;