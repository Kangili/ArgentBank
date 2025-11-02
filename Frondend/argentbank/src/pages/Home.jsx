import React from "react";
import HomeFeature from "../components/HomeFeature";

// Import des images depuis src/assets/icons
import iconChat from "../assets/icons/icon-chat.png";
import iconMoney from "../assets/icons/icon-money.png";
import iconSecurity from "../assets/icons/icon-security.png";

/**
 * Page d'accueil Argent Bank
 */
function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="hero" style={{ backgroundColor: "#2c3e50", padding: "60px 20px", color: "#fff", textAlign: "center" }}>
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle" style={{ fontSize: "1.2rem", margin: "10px 0" }}>No fees.</p>
          <p className="subtitle" style={{ fontSize: "1.2rem", margin: "10px 0" }}>No minimum deposit.</p>
          <p className="subtitle" style={{ fontSize: "1.2rem", margin: "10px 0" }}>High interest rates.</p>
          <p className="text" style={{ fontSize: "1rem", marginTop: "20px" }}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      {/* Features Section */}
      <section className="features" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "40px" }}>
        <HomeFeature
          img={iconChat}
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <HomeFeature
          img={iconMoney}
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be!"
        />
        <HomeFeature
          img={iconSecurity}
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
}

export default Home;

