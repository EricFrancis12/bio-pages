'use client';

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function _GoogleAnalytics() {
    return (
        <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} trackPageViews />
    )
}
