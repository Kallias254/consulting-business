# 05: Financial Plan - The "Mullah" Model

Our financial strategy is designed to maximize profit by leveraging the agency model while maintaining the highest standards of trust and professionalism for the US academic market.

## The Agency Profit Model: The 25/75 Principal Split
The core of our financial success lies in the clear division of revenue between business development and operational execution.

- **Micah (25%):** Micah receives a flat 25% of the net revenue (after transaction fees) for his role in strategy, sales, and high-level quality control.
- **You (75%):** You receive 75% of the net revenue. From this amount, you manage all **Production Costs** (paying the researchers/students) and maintain the technical infrastructure. Your profit is the surplus remaining after these costs are met.

### Margin Targets
To ensure both principals are fairly compensated:
- **Researcher Payout:** We aim to keep total researcher/production costs within 40-50% of the total project value.
- **Principal Parity:** This structure ensures that after the "work" is paid for, both Micah and you retain a roughly equal net profit margin, while acknowledging the additional administrative and financial responsibility you handle in managing the team.

This model is profitable, scalable, and creates a win-win: clients get an elite product, students get paid experience, and the agency builds a sustainable business.

---

## Payment Terms & Structure
To ensure clear expectations and healthy cash flow, the following payment structures will be our standard:

- **The Finisher (Tier 1):** 50% non-refundable deposit is required to begin work. The final 50% is due upon delivery of the final files.
- **The Scholar (Tier 2):** 
    - For milestone-based projects, a 50% deposit is required, with the final 50% due upon completion.
    - For hourly consulting, hours are sold in pre-paid blocks of 10 or 20, with a minimum initial purchase.
- **The Professional (Tier 3):** 
    - Retainers are billed monthly, in advance.
    - New clients will typically begin with a fixed-price "Starter Project" (see Marketing & Sales plan), which requires a 50% deposit.

---

## Trust & Payment Infrastructure

US academics and their institutions are risk-averse. Our infrastructure is designed to project professionalism and security.

### 1. Payment Processing: Stripe & Wise
- **Primary (Stripe):** We will use a professional **Stripe Business Account** established under Micah's US-based standing.
    - **Integration Flow:**
        1. A project milestone is marked "Ready for Payment" in the Agency OS.
        2. The frontend creates a **Stripe Checkout Session**.
        3. The client pays via Credit Card or **ACH (Bank Transfer)**.
        4. A Stripe webhook updates the project status in Payload, unlocking the next phase or final delivery.
- **Alternative (Wise Business):** If Stripe is unavailable or if the client prefers a direct international or domestic wire, we will utilize **Wise Business**.
    - **Trust Signal:** All payment details provided to clients (for both Stripe and Wise) will be registered under the **consulting firm's name**, ensuring high professional standards and institutional trust for university grant offices.
- **The ACH/Wire Advantage:** Institutional clients often find it easier to authorize a direct bank transfer (ACH or Wire) for large sums than to use a credit card. Supporting these methods via a branded business account is essential for large-scale grant fulfillment.

### 2. Fiscal Cycle Alignment
- **"Year-End Spend":** US university and grant budgets often have "use it or lose it" deadlines (typically June or December).
- **Strategy:** We will conduct targeted marketing campaigns 30-45 days before these deadlines, offering to help researchers "finalize your projects and utilize your remaining 202X funds."

### 3. Data Security & Sovereignty
- **Our Pitch:** "Your research data is confidential and stays within our private, secure system."
- **Infrastructure:** Using a self-hosted solution (Payload on Docker with SQLite) allows us to make a credible promise that their data isn't being scraped or shared with third-party AI services, which is a major concern for researchers with unpublished data.
