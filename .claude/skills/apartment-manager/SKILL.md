---
name: apartment-manager
description: Add, update, or search apartments in the apartment hunting database for TLV Old North. Use this skill when asked to add a new apartment listing, change an apartment's status, schedule a viewing, or query the apartment database.
---

# Apartment Manager

You manage the apartment hunting database at `public/data/apartments.json` in the project root.

## Reading the Database

Always read the current file first before making changes:

```bash
cat public/data/apartments.json
```

## Data Schema

The file contains an `ApartmentDatabase` object:

```json
{
  "apartments": [ ...Apartment objects... ],
  "lastUpdated": "ISO 8601 timestamp"
}
```

Each `Apartment` has these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | UUID (use `crypto.randomUUID()` format) |
| `price` | number | Yes | Monthly rent in ILS |
| `rooms` | number | Yes | Number of rooms (e.g., 3, 3.5) |
| `sizeM2` | number | Yes | Size in square meters |
| `floor` | number | Yes | Floor number |
| `totalFloors` | number | No | Total floors in building |
| `address` | string | Yes | Full street address |
| `neighborhood` | string | Yes | Always "Old North" for this project |
| `lat` | number | Yes | Latitude coordinate |
| `lng` | number | Yes | Longitude coordinate |
| `sourceUrl` | string | Yes | Link to original listing (Yad2, Facebook, etc.) |
| `imageUrl` | string | No | Primary photo URL |
| `images` | string[] | No | Additional photo URLs |
| `status` | string | Yes | One of: `"interesting"`, `"not_interesting"`, `"ask_to_see"`, `"seeing"` |
| `viewing` | object | No | Only when status is `"seeing"` |
| `viewing.date` | string | Yes* | Date in YYYY-MM-DD format |
| `viewing.time` | string | Yes* | Time in HH:MM format |
| `viewing.notes` | string | No | Additional notes |
| `viewing.contactName` | string | No | Contact person name |
| `viewing.contactPhone` | string | No | Contact phone number |
| `description` | string | No | Free text description |
| `highlights` | string[] | No | Feature tags, e.g., `["balcony", "parking"]` |
| `dateAdded` | string | Yes | ISO 8601 timestamp of when added |
| `dateUpdated` | string | Yes | ISO 8601 timestamp of last update |
| `addedBy` | string | Yes | `"agent"` or `"manual"` |

## Adding a New Apartment

1. Read `public/data/apartments.json`
2. Create a new apartment object with all required fields
3. Generate a UUID for the `id` field (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. Set `dateAdded` and `dateUpdated` to the current ISO 8601 timestamp
5. Set `addedBy` to `"agent"`
6. Set `lat`/`lng` using the geocoding reference below
7. Append the new apartment to the `apartments` array
8. Update the root `lastUpdated` field
9. Write the updated JSON (2-space indentation) back to `public/data/apartments.json`
10. Commit with message: `"feat: add apartment at [address]"`

## Updating an Apartment Status

1. Read the database
2. Find the apartment by `id` or by matching the address
3. Update the `status` field
4. If changing to `"seeing"`, set the `viewing` object with at least `date` and `time`
5. If changing away from `"seeing"`, remove the `viewing` object
6. Update `dateUpdated` to current timestamp
7. Write and commit: `"update: [address] status -> [new status]"`

## Scheduling a Viewing

1. Set `status` to `"seeing"`
2. Set `viewing` object:
   ```json
   {
     "date": "2026-03-25",
     "time": "14:00",
     "contactName": "Name",
     "contactPhone": "054-1234567",
     "notes": "Ring the bell"
   }
   ```
3. Commit: `"feat: schedule viewing at [address] on [date]"`

## Geocoding Reference — Tel Aviv Old North

Use these coordinates as baselines for common streets. Adjust lat/lng slightly (3rd-4th decimal) based on the street number:

| Street | Latitude | Longitude | Notes |
|--------|----------|-----------|-------|
| Nordau Blvd | 32.0935 | 34.7818 | Runs east-west |
| Dizengoff (200+) | 32.0920 | 34.7745 | North section, runs north-south |
| Jabotinsky | 32.0912 | 34.7835 | Runs east-west |
| Ben Yehuda (160+) | 32.0898 | 34.7725 | North section, near beach |
| Arlozorov | 32.0865 | 34.7810 | South boundary of Old North |
| Weizmann | 32.0870 | 34.7850 | East side |
| Pinkas | 32.0950 | 34.7800 | North boundary |
| Yehoshua Bin Nun | 32.0910 | 34.7710 | Near the beach |

**Adjustment rule**: For every ~100 meters along a street, shift by ~0.001 in the relevant direction.

## Bulk Adding Apartments

When adding multiple apartments at once, add them all to the array in a single file write and make one commit:
```
"feat: add [N] apartments from [source]"
```

## Important Rules

- **Always preserve existing apartments** — never overwrite the file, always merge
- **Never remove apartments** without explicit user instruction
- **Validate required fields** before writing
- **Keep JSON formatted** with 2-space indentation
- **Always commit** after making changes to the database
- **Use descriptive commit messages** so the history is useful
