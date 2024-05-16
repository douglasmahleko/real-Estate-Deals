import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Float "mo:base/Float";

module {

    public type House = {
    houseID : Text;
    address : Text;
    city : Text;
    province : Text;
    country : Text;
    principleIdAgent: Principal;
    phase : Text;
    roomsAvailable : Int;
    conditions : Text;
    amountPerRoom : Float;
    requirements : Text;
    utilities : Text;
    available : Bool;
    physicalDescription : Text;
    agentEmail : Text;
  };
  public type UnofficialHouse = {
    houseID : Text;
    address : Text;
    city : Text;
    province : Text;
    country : Text;
    phase : Text;
    roomsAvailable : Int;
    conditions : Text;
    amountPerRoom : Float;
    requirements : Text;
    utilities : Text;
    available : Bool;
    physicalDescription : Text;
    agentEmail : Text;
  };
  public type UnofficialUpdatingHouse = {
    id:Text;
    houseID : Text;
    address : Text;
    city : Text;
    province : Text;
    country : Text;
    phase : Text;
    roomsAvailable : Int;
    conditions : Text;
    amountPerRoom : Float;
    requirements : Text;
    utilities : Text;
    available : Bool;
    physicalDescription : Text;
    agentEmail : Text;
  };
  public type ShortListedHouse = {
    principleIdClient: Principal;
    principleIdAgent: Principal;
    agentEmail : Text;
    clientEmail : Text;
    address : Text;
    houseID : Text;
    clientContact : Text;
    roomsTaken : Int;
  };
  public type UnofficialShortListedHouse = {
    principleIdAgent: Text;
    agentEmail : Text;
    clientEmail : Text;
    address : Text;
    houseID : Text;
    clientContact : Text;
    roomsTaken : Int;
  };
  
  public type HouseOffMarket = {
    principleIdClient: Principal;
    principleIdAgent: Principal;
    clientEmail:Text;
    agentEmail : Text;
    address : Text;
    houseID : Text;
    clientContact : Text;
    roomsTaken : Int;
  };
  public type UnofficialHouseOffMarket = {
    principleIdClient: Text;
    clientEmail:Text;
    agentEmail : Text;
    address : Text;
    houseID : Text;
    clientContact : Text;
    roomsTaken : Int;
  };
}