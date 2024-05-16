import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Int64 "mo:base/Int64";

module {

    public type Recomendation = {
    principleIdClient: Principal;
    address : Text;
    clientEmail: Text;
    agentEmail : Text;
    principleIdAgent: Principal;
    houseID : Text;
    phase : Text;
    city : Text;
    done : Bool
  };
  public type UnOfficialRecomendation = {
    principleIdClient: Text;
    address : Text;
    clientEmail: Text;
    agentEmail : Text;
    houseID : Text;
    phase : Text;
    city : Text;
    done : Bool
  };
  public type ClientNeeds = {
    principleIdClient: Principal;
    clientEmail: Text;
    amountPerRoom : Float;
    roomsNeeded : Int;
    budget : Int64;
    province : Text;
    country : Text;
    city : Text;
    personalInfo : Text;
    phase : Text;
    consideration : Text;
    requirements : Text;
    dateExpectingHouse : Text;
  };
  public type UnofficialClientNeeds = {
    clientEmail: Text;
    amountPerRoom : Float;
    roomsNeeded : Int;
    budget : Int64;
    province : Text;
    country : Text;
    city : Text;
    personalInfo : Text;
    phase : Text;
    consideration : Text;
    requirements : Text;
    dateExpectingHouse : Text;
  };
}
