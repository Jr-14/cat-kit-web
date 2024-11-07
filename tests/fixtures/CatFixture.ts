import type { Cat } from "~/schemas/catSchema";
import { faker } from "@faker-js/faker";

type Override = Omit<Partial<Cat>, "id">;
type Required = Pick<Cat, "name">;

export const createCatFixture = (required: Required, override?: Override): Omit<Cat, "id"> => {
    return {
        name: required.name,
        sex: faker.helpers.arrayElement(['Male', 'Female']),
        dateOfBirth: faker.date.birthdate({ mode: 'age', min: 0, max: 25 }).toUTCString(),
        microchip: faker.string.alphanumeric(10),
        description: null,
        breed: null,
        image: null,
        ...override
    }
}