export const mapSpeciesToClassification = (id: string) => {
  switch (id) {
    case "1":
    case "3":
    case "6":
    case "9":
    case "10":
    case "13":
    case "14":
    case "15":
    case "20":
    case "22":
    case "23":
    case "25":
    case "29":
    case "33":
    case "34":
    case "35":
    case "37":
      return "mammal";
    case "2":
      return "artifical";
    case "4":
      return "sentient";
    case "5":
      return "gastropod";
    case "7":
    case "16":
    case "30":
    case "36":
      return "reptile";
    case "8":
    case "12":
    case "21":
    case "27":
    case "31":
    case "32":
      return "amphibian";
    case "28":
      return "insectoid";
    case "11":
    case "17":
    case "18":
    case "19":
    case "24":
    case "26":
    default:
      return "unknown";
  }
};

export const getPersonSpecification = (person: Person) => {
  if (!person) return "unknown";

  const species = person.species[0];
  /**
   * Weirdly many characters that are obviously humans (=mammals) have empty array of species. For example: Luke Skywalker, Lela Organa, etc.
   *
   * Considering this as an error in SWAPI, I decided to assign human-type to those who has no species specified
   */
  const speciesId = species ? species.split("/")[5] : "1";

  return mapSpeciesToClassification(speciesId);
};
