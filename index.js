"use strict";
const path = require('path');
const fs = require('fs');
const process = require('process');     //resolving cwd

/*
    * Basic configuration object
*/
const config = {
    inputURL: path.cwd()
};
/*
  * Reads in all the input files and stores them for testing

  - The function reads a directory specified in config or fallback to process.cwd() return

  config :{Object} - An object detailing a configuration for this process.
  Users can configure the input url
*/
async function readInputDataSetFiles(config){
    let {inputURL} = config;

    if(!inputURL){
        inputURL = process.cwd()

        //Mutate the config
        config.inputURL = inputURL;
    }

    //Read the url
    fs.readdir(inputURL, (err, inputDataSets) => {
        if(err){
            console.log(err);
        }

        //Handle the input data files one after the other
        inputDataSets.forEach(dataSet => {
            const fd = path.join(config.inputURL, dataSet);     //compose path
            fs.readFile(fd, (err, content) => {
                if(err){
                    console.log(err);
                }

                //Handle the contents line by line
                const rl = readline.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity
                });

                //Read content line by line using a label to identify the line
                let slideNo = 0;

                rl.on('line', (line) => {
                    //Process the line number
                    let numberOfPhotos;

                    if(slideNo === 0){
                        numberOfPhotos = Number(line);      //we are in the first line
                    }else{
                        //Its an ith slide - where i is the slideNo
                    }

                    //We have this many photos? Lets explore each of them
                    for(let i = 0; i < numberOfPhotos; i++){
                        const ithSlide = String(line).split();
                        //The first element if the orientation
                        const orientation = ithSlide.shift();       //H - horizontal V - vertical
                        const numOfTags = Number(ithSlide.shift());         //Number of slides

                        //We have numOfTags long ithSlide - Time to confirm
                        if(ithSlide.length !== numOfTags){
                            console.log("Incompatible data set");
                            return;
                        }

                        //we should now display them on a slide show
                    }
                })


            })
        })
    })

}


//Decode number of tags
function decode(s1, s2){
    //Get the and and exor content of the two slides tags
    let tmpS1 = s1;     //so that we can mutate them
    let tmpS2 = s2;

    const commonTags = tmpS1.filter(el => Boolean(tmpS2.find(el))).length;
    if(commonTags === 0){
        return 0;
    }

    //Extracts the exclusive tags from both s1 and s2
    commonTags.forEach(tag => {
        tmpS1.splice(tmpS1.findIndex(tag), 1];
        tmpS1.splice(tmpS1.findIndex(tag), 1];
    });

    return Math.min(tmpS1, tmpS2, commonTags)
}
