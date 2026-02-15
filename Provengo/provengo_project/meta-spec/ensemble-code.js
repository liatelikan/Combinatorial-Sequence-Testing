// @provengo summon ctrl

const dimesns = {
    'UserType': ['vip', 'customer', 'guest'], 
    'Country': ['US', 'FR'], 
    'ProductSize': ['S', 'M', 'L'], 
    'Quantity': ['quantity 1', 'quantity 4'], 
    'Carrier': ['My carrier', 'My cheap carrier']
};


function eventMatches(actualEvent, criterion) {
if (!actualEvent || !actualEvent.name) return false;
    return actualEvent.name.toLowerCase().includes(criterion.toLowerCase());
}


function getTwoWayGoals(dimesns) {
    let goals = [];
    const keysets = Object.keys(dimesns);
    
    for (let i = 0; i < keysets.length; i++) {
        for (let j = i + 1; j < keysets.length; j++) {
            for (let val1 of dimesns[keysets[i]]) {
                for (let val2 of dimesns[keysets[j]]) {
                    goals.push([val1, val2]);
                }
            }
        }
    }    
    return goals;       
}

// function getDomainSpecificGoals() {
//     any('Login before vip').or(any('Login after vip')),
//     any('Choose size L'),
//     any('Choose country US'),
//     any('Choose country FR'),
//     any('Choose carrier My carrier'),
//     any('Choose carrier My cheap carrier'),
//     'BULK DISCOUNT'
// }

function getDomainSpecificGoals() {
    return [
        ['vip', 'size M', 'checkout'],
        ['size S', 'quantity 4', 'checkout'],
        ['size L', 'quantity 1', 'checkout'],
        ['FR', 'checkout'],
        ['US', 'checkout'],
        ['guest', 'FR'],
        ['My carrier', 'checkout'],
        ['My cheap carrier', 'checkout']
    ];
}


//const GOALS = getTwoWayGoals(dimesns);             
const GOALS = getDomainSpecificGoals();       

// function rankingFunction(ensemble) {           //for 2-way!!!
//     let coveredGoals = 0;

//     for (let goal of GOALS) {
//         let goalMetInEnsemble = false;
//         for (let test of ensemble) {
//             let foundParts = new Set();
//             for (let event of test) {
//                 goal.forEach(part => {
//                     if (eventMatches(event, part)) {
//                         foundParts.add(part);
//                     }
//                 });
//             }
//             if (foundParts.size === goal.length) {
//                 goalMetInEnsemble = true;
//                 break; 
//             }
//         }

//         if (goalMetInEnsemble) {
//             coveredGoals++;
//         }
//     }
//     return (coveredGoals / GOALS.length) * 100;
// }

function rankingFunction(ensemble) {              //for domain-specific!!!
    let coveredGoals = 0;

    for (let goal of GOALS) {
        let goalMetInEnsemble = false;
        for (let test of ensemble) {
            let allStepsFound = true;
            for (let requiredStep of goal) {
                let stepFound = false;

                for (let event of test) {
                    if (eventMatches(event, requiredStep)) {
                        stepFound = true;
                        break;
                    }
                }
                if (!stepFound) {
                    allStepsFound = false;
                    break; 
                }
            }
            if (allStepsFound) {
                goalMetInEnsemble = true;
                break; 
            }
        }

        if (goalMetInEnsemble) {
            coveredGoals++;
        }
    }
    return (coveredGoals / GOALS.length) * 100;
}

function countMetGoals(ensemble, goals) {
    let metGoals = 0;
    for (let goal of goals) {
        let goalMet = false;
        for (let test of ensemble) {
            let allConditionsMetInTest = true;
            for (let criterion of goal) {
                let foundEvent = false;
                for (let event of test) {
                    if (eventMatches(event, criterion)) {
                        foundEvent = true;
                        break;
                    }
                }
                if (!foundEvent) {
                    allConditionsMetInTest = false;
                    break; 
                }
            }
            if (allConditionsMetInTest) {
                goalMet = true;
                break;
            }
        }
        if (goalMet) {
            metGoals++;
        }
    }
    return metGoals;
}