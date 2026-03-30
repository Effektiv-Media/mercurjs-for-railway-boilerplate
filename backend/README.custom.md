# ClickFynd Custom Backend Features

This file documents custom backend features built on top of MedusaJS + Mercur.

## Overview

ClickFynd extends the base marketplace platform with custom modules, routes, subscribers, and jobs for:

- listing fee rules
- timed listing expiration
- republishing expired listings
- product view tracking
- bestseller tracking
- homepage ranking logic

---

## Custom Modules

### `listing_fee`

Purpose:
- Stores and resolves listing fee rules based on listing duration

Main responsibilities:
- define active listing fee rules
- resolve fee percentage from selected listing duration
- support fallback defaults if rules are missing

Used by:
- republish flow
- product publish subscriber
- order commission logic

Related table:
- `listing_fee_rule`

Current rules:
- 10h → 4%
- 24h → 6%
- 48h → 8%

---

### `product_view`

Purpose:
- Tracks product detail page views

Main responsibilities:
- store product view records
- support deduplicated view tracking
- power the **Popular** section on storefront

Related table:
- `product_view`

Important rule:
- one visitor can only register one view per product per 24 hours

---

### `product_sale`

Purpose:
- Tracks sold products from placed orders

Main responsibilities:
- store product sales records
- power the **Best Sellers / Fler fynd** section

Related table:
- `product_sale`

Important rule:
- bestseller ranking is calculated using the last 7 days of sales

---

## Custom Vendor API Routes

### `POST /vendor/products/:id/republish`

Purpose:
- Republishes an expired draft product

Request body:
```json
{
  "title": "Updated title",
  "handle": "updated-handle",
  "description": "Updated description",
  "discountable": true,
  "listing_duration_hours": 24
}