# LSA Booking frontend demo

This folder contains a deliberately small, dependency-free frontend prototype for the HabotConnect hiring project. It is currently a static demo: search results are sample data, and booking submissions are displayed locally instead of being sent to an API.

## Run locally

From the repository root, run:

```powershell
python -m http.server 5500 --directory frontend
```

Then open `http://localhost:5500` in a browser.

## Planned API integration

Once the assignment's backend contract exists, replace the sample data and local preview in `app.js` with requests to:

- `GET /api/v1/lsas/search/?skill=...`
- `POST /api/v1/bookings/`

If this frontend remains on port 5500 while Django runs on port 8000, the backend will also need an explicit CORS policy allowing that origin. No API calls are made yet, so no backend configuration has been changed.
