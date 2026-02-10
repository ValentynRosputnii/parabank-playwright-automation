import { request } from '@playwright/test';

export async function waitForApp(baseURL: string, timeoutMs = 60_000) {
    const start = Date.now();
    const api = await request.newContext({ baseURL, timeout: 5_000 });

    try {
        while (Date.now() - start < timeoutMs) {
            try {
                const res = await api.get(''); // саме baseURL
                const status = res.status();

                if (status >= 200 && status < 400) return;
            } catch {
                // ignore
            }
            await new Promise((r) => setTimeout(r, 1000));
        }
    } finally {
        await api.dispose();
    }

    throw new Error(`App is not ready after ${timeoutMs}ms: ${baseURL}`);
}