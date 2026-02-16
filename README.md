# Blog Aggregator CLI

A command-line blog aggregation tool built with **TypeScript**, **Node.js**, and **PostgreSQL**.

---

# Full Application Flow

1. User registers or logs in.
2. User adds RSS feeds.
3. User follows feeds.
4. The `agg` command starts a continuous scraping loop.
5. The scraper:
   - Selects the next feed to fetch (prioritizing never-fetched feeds).
   - Marks the feed as fetched.
   - Fetches RSS XML content.
   - Parses XML into structured JSON.
   - Extracts posts.
   - Saves new posts into the database.
6. The user runs `browse` to read latest posts.

---

# Command Responsibilities
- Note: You can run command using 'npm run <commandName>', for ex: npm run following
- Below is the responsibility of each command in the CLI:

## Authentication & User Management

### register

Creates a new user in the database.

- Checks if the username already exists.
- Inserts new user record.

### login

Logs in an existing user.

- Verifies the user exists.
- Stores logged-in user in config.
- Enables protected commands.

---

### users: Displays all registered users.

### addfeed: Adds a new RSS feed (requires login).

### feeds: Displays all available feeds in the system.

### follow

Allows a user to follow a feed.

- Inserts record into `feed_follows` table.
- Prevents duplicate follow relationships.
- Enforces user-feed uniqueness constraint.

### unfollow: Removes a follow relationship.

### following: Displays feeds that the current user follows.

### agg

Starts continuous RSS scraping.

- Accepts a duration argument (e.g., 1m, 10s).
- Parses duration into milliseconds.
- Immediately runs `scrapeFeeds`.
- Runs scraper using `setInterval`.

### browse: Displays latest posts from followed feeds.

---

# Tech Stack

- **TypeScript**
- **Node.js**
- **PostgreSQL**
- **Drizzle ORM**
- **fast-xml-parser**