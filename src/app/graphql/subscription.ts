import gql from "graphql-tag";

const BUSINESS_MODEL_ON_EDIT = gql`
  subscription businessModelOnEdit {
    businessModelOnEdit {
      id
      title
      content {
        keyPartners
        keyActivities
        valueProposition
        customerRelationships
        customerSegments
        keyResources
        channels
        costStructure
        revenueStreams
      }
    }
  }
`;

const ON_NEW_BUSINESS_MODEL = gql`
  subscription newBusinessModel {
    newBusinessModel {
      id
      title
      content {
        keyPartners
        keyActivities
        valueProposition
        customerRelationships
        customerSegments
        keyResources
        channels
        costStructure
        revenueStreams
      }
    }
  }
`;

export default { BUSINESS_MODEL_ON_EDIT, ON_NEW_BUSINESS_MODEL };
