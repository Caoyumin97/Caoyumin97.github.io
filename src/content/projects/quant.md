---
title: "A-Share Quant Platform"
description: "An integrated backtesting, parameter optimization, and simulation platform for Chinese stock CTA strategies, with a web dashboard and Monaco editor for custom strategy development."
tech: ["Python", "FastAPI", "VNpy", "React", "TypeScript", "Ant Design", "Zustand", "SQLAlchemy", "WebSocket"]
github: "https://github.com/Caoyumin97/quant"
featured: true
lang: en
---

## Why

I wanted a self-hosted platform to test CTA (Commodity Trading Advisor) strategies on A-share data without paying for expensive commercial tools. Most open-source backtesting frameworks are either CLI-only or require deep Python knowledge to configure. I wanted something with a proper web dashboard — visual strategy comparison, parameter sweeps, and a code editor to write custom strategies without leaving the browser.

## Architecture

The platform is split into a FastAPI backend (running the VNpy backtesting engine) and a React frontend for interactive analysis.

```mermaid
graph TB
    subgraph Frontend["React Dashboard"]
        Editor[Monaco Editor]
        Charts[Ant Design Charts]
        WS_Client[WebSocket Client]
    end

    subgraph Backend["FastAPI"]
        Router[API Routes]
        Engine[VNpy CTA Engine]
        Optimizer[Grid Search Optimizer]
        Sandbox[RestrictedPython Sandbox]
        TaskDB[(SQLite - Tasks)]
        WS_Server[WebSocket Server]
    end

    subgraph Data["Data Sources"]
        AK[akshare]
        TS[tushare]
        BS[baostock]
    end

    Editor -- "strategy code" --> Router
    Router --> Sandbox
    Sandbox --> Engine
    Router --> Optimizer
    Optimizer --> Engine
    Engine --> Data
    WS_Server -- "real-time progress" --> WS_Client
    Engine -- "results" --> Charts

    style Frontend fill:transparent,stroke:#a78bfa
    style Backend fill:transparent,stroke:#6ee7b7
    style Data fill:transparent,stroke:#fbbf24
```

### Backtesting Flow

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant API
    participant Engine
    participant DataSource

    User->>Dashboard: Configure strategy + params
    Dashboard->>API: POST /backtest
    API->>DataSource: Fetch historical data
    DataSource-->>API: OHLCV bars
    API->>Engine: Run CTA backtest
    Engine-->>API: Trades + equity curve
    API-->>Dashboard: Results (via WebSocket)
    Dashboard->>User: Charts + metrics
```

### Key Design Decisions

**11 built-in strategies.** DMA, RSI, MACD, Bollinger Bands, ATR, KDJ, CCI, DMI, TRIX, WR, and DualThrust — covering the most common CTA patterns. Each strategy uses the same VNpy `CtaTemplate` interface, so switching between them is just changing a config.

**Grid search with out-of-sample validation.** Parameter optimization splits data into in-sample and out-of-sample periods. This guards against overfitting — a strategy that only works on training data is useless.

**Sandboxed custom strategies.** Users can write Python strategies in the Monaco editor, and the backend executes them via RestrictedPython. This prevents filesystem/network access from user code while still giving full access to the VNpy strategy API.

**WebSocket progress tracking.** Backtests and optimizations can take minutes. Rather than polling, the frontend opens a WebSocket connection and receives real-time updates — current progress, partial results, and estimated time remaining.

## How It's Built

The backend was straightforward — FastAPI wrapping VNpy's existing CTA engine with some async glue for the task queue. The interesting part was building the parameter optimizer: running multiple backtests in parallel while streaming progress updates through WebSocket.

The frontend was built with Claude Code in a couple of sessions. Ant Design's dark theme plus Monaco Editor gave it a professional look out of the box. The strategy comparison view — overlaying multiple equity curves on the same chart — took some manual tuning to get the axis scaling and legend placement right.

Data sourcing is pluggable: akshare is the default (no API key needed), with optional adapters for tushare and baostock for users who have accounts.
