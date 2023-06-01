
const allSpans = document.querySelectorAll(".results p span");
const userInputs = document.querySelectorAll(".user-input input");
const select = document.querySelector("select");
var selectedConverter = 0;
var userInputVal = {
    generalInput: 0,
    inchInput: 0,
}

//to tap into pseudo elements
const allParas = document.querySelectorAll(".results p");
const allConvArray = ["mm", "cm", "in", "ft", "m", "km", "miles", "ft", "in"];

allParas.forEach(function(eachParaAfter, index){
    eachParaAfter.style.setProperty("--afterContent", `'${allConvArray[index]}'`)
});


//adding event listener to select element
select.addEventListener("change", function(){
    selectedConverter = select.selectedIndex;
    showHideInchInput(selectedConverter);

    let resultInFt = any2ft(selectedConverter, userInputVal);
    let resultInAnyArray = resultsInFeetToAny(resultInFt);

    displayResults(resultInAnyArray);
});

//adding event listener to input elements
userInputs.forEach(function(userInput){
    userInput.addEventListener("input", function(){

        let inputClass = userInput.className;

        if (inputClass === "general-input"){
            userInputVal.generalInput = Number(userInput.value);
        } else {
            userInputVal.inchInput = Number(userInput.value);
        }
        
        let resultInFt = any2ft(selectedConverter, userInputVal);
        let resultInAnyArray = resultsInFeetToAny(resultInFt);

        displayResults(resultInAnyArray);
    });
});


//show or hide inch input
function showHideInchInput(indexVal){
    if (indexVal === 7){
        userInputs[1].classList.remove("display-disable");
    }
    else {
        userInputs[1].classList.add("display-disable");
    }
}

//any to feet
function any2ft(selectIndex, inputVals){
    if (selectIndex === 0){
        //mm2ft
        return mm2ft(inputVals.generalInput);
    }
    else if (selectIndex === 1){
        //cm2ft
        return cm2ft(inputVals.generalInput);
    }
    else if (selectIndex === 2){
        //in2ft
        return in2ft(inputVals.generalInput);
    }
    else if (selectIndex === 3){
        //ft2ft
        return ft2ft(inputVals.generalInput);
    }
    else if (selectIndex === 4){
        //m2ft
        return m2ft(inputVals.generalInput);
    }
    else if (selectIndex === 5){
        //km2ft
        return km2ft(inputVals.generalInput);
    }
    else if (selectIndex === 6){
        //miles2ft
        return mile2ft(inputVals.generalInput);
    }
    else if (selectIndex === 7){
        //ftIn2ft
        return ftAndInch2ft(inputVals);
    }

}

// mm to ft
function mm2ft(mm){
    return mm / 304.8;
}

// cm to ft
function cm2ft(cm){
    return cm / 30.48;
}

//in to ft
function in2ft(inc){
    return inc / 12;
}

//ft to ft
function ft2ft(ft){
    return Number(ft);
}

// m to ft
function m2ft(m){
    let m2cm = m * 100;
    return cm2ft(m2cm);
}

// km to ft
function km2ft(km){
    let km2m = km * 1000;
    return m2ft(km2m);
}

// miles to ft
function mile2ft(mile){
    let km = mile * 1.60934;
    return km2ft(km);
}

// ft and inch to ft
function ftAndInch2ft(ftAndInchObject){
    let onlyFt = ftAndInchObject.generalInput;
    let onlyIn = ftAndInchObject.inchInput;
    let sumOfFtAndIncInFt = Number(onlyFt) + Number(in2ft(onlyIn));

    return sumOfFtAndIncInFt;
}



//feet to any
function resultsInFeetToAny(resultInFt){
       let mmResult = ft2mm(resultInFt);
       let cmResult = ft2cm(resultInFt);
       let incResult = ft2inc(resultInFt);
       let ftResult = ft2ft(resultInFt);
       let mResult = ft2m(resultInFt);
       let kmResult = ft2km(resultInFt);
       let mileResult = ft2miles(resultInFt);
       let ftAndInchResultArray = ft2ftInch(resultInFt);
    
       return [mmResult, cmResult, incResult, ftResult, mResult, kmResult, mileResult, ftAndInchResultArray];

}

//ft to mm
function ft2mm(ft){
    return ft * 304.8;
}

// ft to cm
function ft2cm(ft){
    return ft * 30.48;
}

// ft to inc
function ft2inc(ft){
    return ft * 12;
}

// ft to m
function ft2m(ft){
    let cm = ft2cm(ft);
    return cm / 100;
}

// ft to km
function ft2km(ft){
    let m = ft2m(ft);
    return m / 1000;
}

// ft to miles
function ft2miles(ft){
    let km = ft2km(ft);
    return km / 1.60934;
}

// ft to ftAndInch
function ft2ftInch(ft){
    let intAndFracStringArray = String(ft).split(".");
    let integerPart = Number(intAndFracStringArray[0]);
    let fractionalPart = 0;
    let inchOfFrac = 0;
    
    if (intAndFracStringArray.length > 1){
        fractionalPart = Number("0." + intAndFracStringArray[1]);
    }
    // fractional decimal ft to inch 
    inchOfFrac = ft2inc(fractionalPart);
    
    return [integerPart, inchOfFrac];

}


//display results
function displayResults(resultArray){
    resultArray.forEach(function(eachEle, index){
        if (index === 7){
            eachEle.forEach(function(innerEle){
                // allSpans[index].innerHTML = innerEle;
                allSpans[index].innerHTML = trimResults(innerEle);
                index ++;
            });
        }else {
            allSpans[index].innerHTML = trimResults(eachEle);
        }
        
    });
}


//trim fractional part
function trimResults(toTrimValue){
    let value = toTrimValue;
    let valueSplitArray = String(value).split(".");
    let finalResult = 0;
    let fractPartResult = "0.";
    let count = 0;

    if (valueSplitArray.length === 1){
        finalResult = Number(valueSplitArray[0]);
        //return finalResult;
    }
    else if (valueSplitArray.length === 2){
        let fractionalPart = valueSplitArray[1];
        let lenOfFactPart = fractionalPart.length;

        for(var i = 0; i < lenOfFactPart; i++){
            if (fractionalPart[i] != "0"){
                count++;
            }
            fractPartResult += fractionalPart[i];

            if (count > 3){
                break
            }
        }
        finalResult = Number(valueSplitArray[0]) + Number(fractPartResult);
    }
    return finalResult
}

