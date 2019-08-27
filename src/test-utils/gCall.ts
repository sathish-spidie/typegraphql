import { graphql, Source, GraphQLSchema } from "graphql";
import { genSchema } from "../utils/GenSchema";
import Maybe from "graphql/tsutils/Maybe";

interface Options {
  source: string | Source;
  variableValues: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;
export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await genSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
};
