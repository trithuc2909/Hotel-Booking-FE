# FRONTEND ARCHITECTURE REFACTOR IMPLEMENTATION

## OBJECTIVE

Refactor the current Next.js frontend architecture into a scalable feature-driven architecture.

Goals:

* Improve maintainability
* Reduce component chaos
* Increase scalability
* Improve domain ownership
* Separate UI, business logic, and routing
* Prepare project for long-term production scaling

---

# TARGET ARCHITECTURE

```txt
src/
├── app/
│
├── features/
│   ├── auth/
│   ├── booking/
│   ├── room/
│   ├── payment/
│   ├── service/
│   ├── promotion/
│   ├── user/
│   └── ...
│
├── components/
│   ├── ui/
│   └── shared/
│
├── lib/
├── store/
├── config/
├── hooks/
├── styles/
└── types/
```

---

# ARCHITECTURE RULES

---

## 1. APP ROUTER LAYER

`app/` should ONLY contain:

* route definitions
* layouts
* metadata
* suspense boundaries
* auth boundaries
* server component entry points

DO NOT place:

* business logic
* data mapping
* large JSX
* calculations
* reusable UI

### Example

BAD:

```tsx
app/booking-history/[id]/page.tsx
```

contains:

* API fetching
* calculations
* 700 lines JSX

GOOD:

```tsx
export default function Page() {
  return <BookingDetailView />;
}
```

---

# 2. FEATURE-DRIVEN ORGANIZATION

Every business domain owns its own:

* components
* api
* hooks
* types
* services
* utils
* constants

Example:

```txt
features/booking/
├── api/
├── components/
├── hooks/
├── views/
├── services/
├── types/
├── constants/
├── utils/
├── mappers/
├── schemas/
└── index.ts
```

---

# 3. COMPONENT CLASSIFICATION

---

## components/ui

Pure reusable UI components.

NO business logic allowed.

Examples:

```txt
Button.tsx
Input.tsx
Card.tsx
Dialog.tsx
Badge.tsx
Table.tsx
```

---

## components/shared

Reusable app-level components.

Examples:

```txt
EmptyState.tsx
ConfirmDialog.tsx
PageHeader.tsx
ErrorState.tsx
Pagination.tsx
```

---

## features/*/components

Business/domain-specific components.

Examples:

```txt
BookingHeader.tsx
PaymentSummaryCard.tsx
RoomBookingCard.tsx
BookingStatusBadge.tsx
```

DO NOT move feature components into global components folder.

---

# 4. VIEW LAYER

Page composition belongs inside:

```txt
features/{feature}/views
```

Example:

```txt
features/booking/views/BookingDetailView.tsx
```

Responsibilities:

* compose feature components
* orchestrate feature UI
* connect hooks to UI

DO NOT place heavy business logic inside views.

---

# 5. BUSINESS LOGIC SEPARATION

Move business calculations into:

```txt
features/{feature}/services
```

Examples:

```txt
calculateBookingTotal.ts
canCancelBooking.ts
calculateRefundAmount.ts
```

Views/components should NOT calculate domain logic inline.

BAD:

```tsx
const roomTotal = booking.rooms.reduce(...)
```

GOOD:

```tsx
const roomTotal = calculateRoomTotal(booking.rooms)
```

---

# 6. API LAYER

RTK Query or API calls belong inside:

```txt
features/{feature}/api
```

Example:

```txt
features/booking/api/bookingApi.ts
```

DO NOT place API logic inside components.

---

# 7. TYPE ORGANIZATION

Feature-specific types stay inside the feature.

Example:

```txt
features/booking/types
```

Global types should ONLY contain:

* ApiResponse
* Pagination
* shared primitives

---

# 8. MAPPER LAYER

Create mapper layer:

```txt
features/{feature}/mappers
```

Purpose:

* transform API DTOs into ViewModels
* isolate backend changes
* normalize nullable values
* format display-friendly structures

Architecture:

```txt
API DTO
↓
Mapper
↓
ViewModel
↓
UI
```

Example:

```ts
mapBookingDetailToViewModel()
```

---

# 9. CUSTOM HOOKS

Move feature orchestration into hooks.

Example:

```txt
features/booking/hooks/useBookingDetail.ts
```

Responsibilities:

* API fetching
* mutations
* loading states
* derived states
* UI orchestration

---

# 10. BARREL EXPORTS

Every feature must expose public API through index.ts.

Example:

```ts
features/booking/index.ts
```

```ts
export * from "./views";
export * from "./hooks";
export * from "./components";
```

Avoid deep imports.

BAD:

```ts
@/features/booking/components/BookingHeader
```

GOOD:

```ts
@/features/booking
```

---

# 11. IMPORT RULES

Allowed:

```txt
feature -> shared/ui
feature -> lib
feature -> own feature
```

Disallowed:

```txt
feature -> another feature internals
```

Use public API exports only.

---

# 12. COMPONENT SIZE RULE

Refactor components larger than:

* 250-300 lines

into:

* smaller feature components
* hooks
* services

---

# 13. STATE MANAGEMENT

---

## RTK Query

Only for:

* server state

---

## Local UI State

Use:

* useState
* useReducer

---

## Global Client State

Use:

* Zustand
* Redux

ONLY when truly global.

---

# 14. ERROR HANDLING

Replace:

* alert()

With:

* toast system
* ErrorBoundary
* EmptyState
* Retry UI

---

# 15. NEXT.JS BEST PRACTICES

Replace:

```tsx
<img />
```

With:

```tsx
next/image
```

---

Use:

* Suspense
* dynamic imports
* lazy loading
* route groups

where appropriate.

---

# 16. NAMING CONVENTIONS

---

## Components

PascalCase:

```txt
BookingHeader.tsx
```

---

## Hooks

```txt
useBookingDetail.ts
```

---

## Services

```txt
calculateBookingTotal.ts
```

---

## Types

```txt
booking.type.ts
```

---

# 17. DOMAIN OWNERSHIP PRINCIPLE

IMPORTANT:

Business domains own their logic.

Booking-related code belongs under:

```txt
features/booking
```

NOT scattered across:

* app
* components
* utils
* constants

---

# 18. MIGRATION STRATEGY

DO NOT refactor entire project at once.

Rule:

> New code must follow the new architecture.

Gradually migrate old code during feature work.

---

# 19. RECOMMENDED BOOKING FEATURE STRUCTURE

```txt
features/booking/
├── api/
│   └── bookingApi.ts
│
├── components/
│   ├── BookingHeader.tsx
│   ├── BookingRoomsTable.tsx
│   ├── PaymentSummaryCard.tsx
│   ├── StayInfoCard.tsx
│   ├── ServicesCard.tsx
│   ├── CustomerCard.tsx
│   ├── SupportCard.tsx
│   └── BookingStatusBadge.tsx
│
├── hooks/
│   ├── useBookingDetail.ts
│   └── useCancelBooking.ts
│
├── views/
│   ├── BookingDetailView.tsx
│   └── BookingHistoryView.tsx
│
├── services/
│   ├── calculateBookingTotal.ts
│   ├── calculateRoomTotal.ts
│   └── canCancelBooking.ts
│
├── mappers/
│   └── booking.mapper.ts
│
├── constants/
│   └── booking.constants.ts
│
├── types/
│   └── booking.type.ts
│
└── index.ts
```

---

# 20. FINAL GOAL

Optimize for:

* scalability
* maintainability
* low cognitive load
* feature isolation
* long-term production development

NOT for:

* short-term folder neatness
* over-generic abstractions
* premature reuse

```
```
