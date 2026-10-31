import { customAlphabet } from "nanoid";
export default function codegen ():string{
const alphabet="0123456789XjpP";
const number= customAlphabet(alphabet,5);
return number();
}