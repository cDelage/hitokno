import { db } from "../database";
import { CreateTestProps, SortMode, TestType } from "../../src/types/Test.type";
import { format } from "date-fns";

export async function createTest({ decks }: CreateTestProps) {
  const testName = `Test ${format(new Date(), "yyyy-MM-dd HH:mm")}`;

  const result = await db.tests.insert({
    testName,
    decks,
    status: "DRAFT",
    cards: [],
    sortMode: "ORDERED" as SortMode
  });

  return result;
}

export async function findTests() {
  return (await db.tests.find({})) as TestType[];
}

export async function findTestById({ _id }: { _id: string }) {
  return (await db.tests.findOne({ _id })) as TestType;
}

export async function updateTest({ test }: { test: TestType }) {
  return await db.tests.updateOne({ _id: test._id }, { $set: { ...test } });
}

export async function deleteTest({ _id }: { _id: string }) {
  return await db.tests.remove({ _id }, { multi: false });
}
