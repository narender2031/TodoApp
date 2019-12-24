import Realm from 'realm';
import {TodoSchema, SectionSchema} from '../models/schema';

export const schemas = [TodoSchema, SectionSchema];

export const realm = new Realm({schema: schemas});
