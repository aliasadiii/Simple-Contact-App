import ContactBar from "./components/ContactBar";
import ContactListProvider from "./context/ContactsContext";

import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <ContactListProvider>
        <Layout>
          <ContactBar />
        </Layout>
      </ContactListProvider>
    </>
  );
}

export default App;
