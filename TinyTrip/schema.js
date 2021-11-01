const offerings = {
  data: [{ State1 }, { State2 }, { State3 }],
};

const States = [{ Location1 }, { Location2 }];

const Location = {
  Hotels: Hotels,
  Villa: Villa,
  LuxProps: LuxProps,
};


const Properties = {
  //Same structure for Villa,LuxProps depending on data being provided.
  Type_Of_Property:"",
  name: "",
  address: "",
  typeOfAccomadations: [{ Type1 }, { Type2 }, { Type3 }],
  highlights: { heading, list: [] },
  attractions: { heading, list: [{ heading, Things_To_Explore: [] }] },
  safety: { heading, list: [] },
  services: { services: [], facilities: [] },
  route: [{ Type_Of_Conveyance, Description }],
};

const Type = {
  suiteName: "",
  imgs: [],
  amenities: [],
  offerEnd: Date,
};
