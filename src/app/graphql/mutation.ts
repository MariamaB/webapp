import gql from "graphql-tag";

const BUSINESS_MODEL_CREATE = gql`
  mutation creatBusinessModel($title: String!) {
    creatBusinessModel(title: $title) {
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

const BUSINESS_MODEL_DELETE = gql`
  mutation deleteBusinessModel($id: String!) {
    deleteBusinessModel(id: $id) {
      id
    }
  }
`;

export default { BUSINESS_MODEL_DELETE, BUSINESS_MODEL_CREATE };
