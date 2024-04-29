import { LeitnerBoxes } from "../../src/features/leitnerBox/LeitnerConstants";
import { LeitnerBoxType } from "../../src/types/LeitnerBox.type";
import { db } from "../database";

export async function initLeitnerBox(){
    const leitnerboxEntry = (await db.leitnerbox.findOne({})) as LeitnerBoxType;
    if(!leitnerboxEntry){
        db.leitnerbox.insert(LeitnerBoxes)
    }
}