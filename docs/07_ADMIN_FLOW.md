# ADMIN FLOW SIMULATION

When demoing the Admin experience to judges, follow this exact path highlighting the new Data Visualization:

1. **Gate Access (`/admin-login`)**: Start by manually typing `http://localhost:3000/admin` into the URL bar. Point out that the browser literally refuses to load the dashboard and physically bounces you back to the red restricted login page. 
2. **Authentication**: Enter the hardcoded master identity:
   - Email: `admin@truevote.com`
   - Password: `secure123`
3. **Live Tally (`/admin`)**: Show the dashboard. Explain that unlike polling stations where votes are hidden in boxes for days, this dashboard runs on WebSockets (`wss://`) and Recharts. The glowing Donut Chart physically maps the political distribution of the 5 parties, and the Area chart tracks incoming votes over time.
4. **Threat Defense**: Wait a few seconds on the dashboard. The system will simulate a sudden background spike in traffic (a simulated DDoS attack) and immediately display a Red "BLOCKED" notification in the threat vector block, proving the system firewall actively defends the ledger.
