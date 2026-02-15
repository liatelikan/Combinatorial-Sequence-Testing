# Deliverables

This directory contains the deliverables for the project. 

1. **SUT Database Backup:**
After preparing the testing environment as described in the assignment instructions, you need to download a backup of the PrestaShop database and save it in this directory as `prestashop_db_backup.sql.gz`. See the assignment instructions for more details.
2. **provengo_project:**
The [provengo_project directory](/Provengo/provengo_project) should contain all the deliverables related to the Provengo model, including:
   1. The behavior file(s).
   2. The action file(s).
   3. The data file(s).
   4. Any additional files or resources used in the Provengo tests.

   All of these files should be properly documented (with code comments) and organized within the Provengo directory.
3. **Provengo products:**
The subdirectory [Provengo](Provengo) should contain the following files (elaborated in the sections below):
   1. A PDF file named [behavior.pdf](Provengo/behavior.pdf) representing the behavior graph of your Provengo model.
   2. A PDF file named [actions.pdf](Provengo/actions.pdf) representing the action graph of your Provengo model.
   3. A JSON file named [two-way.json](Provengo/two-way.json) containing the test suite generated using the two-way coverage criterion.
   4. A JSON file named [domain-specific.json](Provengo/domain-specific.json) containing the test suite generated using the domain-specific coverage criterion.
4. A video file named [prestashop_testing_demo.mp4](prestashop_testing_demo.mp4) demonstrating the execution of a single random walk on the PrestaShop SUT. Place this file in the Deliverables directory.
5. Change the following sections in this `README.md` file to reflect your work.
6. Commit and push all the changes to your GitHub repository.
7. Submit a single txt file named `submission.txt` to the assignment page in Moodle. The file should contain the link to your GitHub repository.

## Explanation of the Provengo model
Our Provengo model simulates a purchase flow on a PrestaShop system. The model is designed to cover various user scenarios. It specifically tests combinations of different User Types (Guest, Registered, VIP), Product Options (Size S, M, L and Quantity 1 or 4), Destinations (US, France), and Shipping Carriers.

## The behavior graph
The behavior graph acts as the roadmap for our test. It visualizes every path a user can take, starting with three main options: Guest, Registered, or VIP. It forces the test to follow a logical order, ensuring that steps like picking a size, entering an address, and choosing a carrier happen in the correct sequence.

## The action graph
The action graph executes the actual work on the website. It translates the roadmap into real clicks, typing, and navigation commands in the browser. It also calculates the math behind the scenes tracking discounts and quantities to verify that the final price displayed on the screen is correct.

## The coverage criteria
The [ensemble-code.js](/Provengo/provengo_project/meta-spec/ensemble-code.js) file should include the code for both criteria. The criteria should be well documented and explained. You may comment out one criterion so that the code will compile.

### Two-way criterion
Once you have implemented the two-way coverage criterion, run the `sample` command to generate a set of 1500 samples. Then, run the `ensemble` command to generate a test suite that satisfies the two-way coverage criterion.

Copy the generated test suite file from [/Provengo/provengo_project/products/run-source/ensemble.json](/Provengo/provengo_project/products/run-source/ensemble.json) to [/Deliverables/Provengo/two-way.json](/Deliverables/Provengo/two-way.json).

In addition, please provide the following information:

#### A brief explanation 
By testing all combinations of user types with sizes, sizes with quantities, quantities with countries... THIS WAY we ensure comprehensive coverage of parameter interactions without the exponential cost of testing all possible combinations. The genetic algorithm efficiently finds a small test suite that covers most or all of these critical two-way interactions.

#### The size of the generated test suite
118

#### The coverage reported by the `ensemble` command
GeneticOptimizer generated an ensemble of size 8 with rank 100.000.

#### The number of passed/failed tests
Tests Result: SUCCESS: 4, OK: 0, FAIL: 0, ERROR: 4

### Domain-specific
Once you have implemented the domain-specific coverage criterion, run the `sample` command to generate a set of 1500 samples. Then, run the `ensemble` command to generate a test suite that satisfies the domain-specific coverage criterion.

Copy the generated test suite file from [/Provengo/provengo_project/products/run-source/ensemble.json](/Provengo/provengo_project/products/run-source/ensemble.json) to [/Deliverables/Provengo/domain-specific.json](/Deliverables/Provengo/domain-specific.json).

In addition, please provide the following information:

#### A brief explanation
The domain-specific coverage criterion focuses on real business scenarios from the PrestaShop requirements, such as VIP discounts, bulk pricing, and tax calculations. Instead of testing all possible combinations, it targets critical workflows. The ranking function measures how many of these are important business goals are covered, ensuring the most critical logic is tested.

#### The size of the generated test suite
117

#### The coverage reported by the `ensemble` command
GeneticOptimizer generated an ensemble of size 6 with rank 100.000.

#### The number of passed/failed tests
SUCCESS: 3, OK: 0, FAIL: 0, ERROR: 3
Run the test model using the command ``provengo run -s products/run-source/ensemble.json`` and report the number of tests that passed and failed. If a test failed, verify that it's not a problem in your model. If it is not, provide a brief explanation of the failure (see the section below).

## Detected Bugs
If you detected any bugs during your testing, provide a detailed description of each bug here. Include the general description, steps to reproduce, expected result, actual result, and a link to the bug report if applicable. If you did not detect any bugs, you can simply state that no bugs were found during the testing process.

We detected the following bugs:
Bug 1: Timing issue during quantity selection
1. General description:
An intermittent timing issue occurred during test execution when setting a quantity greater than three immediately after selecting a product size.
2. Steps to reproduce:
Open a product page, Select a product size, Immediately set the quantity to more than three
3. Expected result:
The quantity should be updated correctly before adding the product to the cart.
4. Actual result:
In some executions, the quantity change was not applied due to asynchronous page updates.