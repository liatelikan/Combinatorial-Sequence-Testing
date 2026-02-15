# Combinatorial-Sequence-Testing
PrestaShop Model-Based Testing (Provengo)
This project implements advanced Model-Based Testing (MBT) for the PrestaShop e-commerce platform using the Provengo tool. It focuses on event-driven testing scenarios, combinatorial coverage, and automated sequence generation.

Overview
The project models the user journey through PrestaShop—from login and product selection to checkout and payment. By using Provengo’s BP-logics, we define independent behavioral threads that the engine weaves together to generate valid test sequences.

Tech Stack & Tools
Provengo: A model-based testing tool for creating event-based scenarios.
JavaScript (BP-JS): Used to define the behavioral models (behavior.js) and the underlying Selenium actions (actions.js).
Selenium WebDriver: Integrated with Provengo to execute the generated sequences on a live browser.

Project Structure
behavior.js: The core logic of the model. Contains bthreads that define constraints and requirements (e.g., a user must login before checkout, or selecting a shipping carrier requires a prior address selection).

actions.js: Maps the abstract events from the model to concrete UI interactions using Selenium (e.g., clicking the "Sign in" button, writing email/password).

domain-specific.json & two-way.json: Generated test suites. two-way.json ensures that every pair of input parameters is tested at least once (2-way combinatorial coverage).

behavior.pdf & actions.pdf: Visualizations of the behavioral model and the possible event sequences (state machine graphs).

Key Scenarios Modeled
Multi-User Support: Scenarios for Guest, Registered, and VIP users (including VIP-specific discount logic).

Product Configuration: Dynamically selecting sizes (S, M, L) and quantities.

Checkout Logic: * Address filling for different countries (US, France).

Shipping carrier selection based on logic constraints.

Self-pickup logic (handling "My carrier" vs "My cheap carrier").
