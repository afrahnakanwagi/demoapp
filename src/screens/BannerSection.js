import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Picker } from "react-native";

const BannerSection = () => {
  const [country, setCountry] = useState("UG");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [displayUnit, setDisplayUnit] = useState("days");
  const [targetAudience, setTargetAudience] = useState("All Users");
  const [bannerType, setBannerType] = useState("");
  const [banners, setBanners] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which banner is being edited

  const uploadBanner = () => {
    if (bannerUrl.trim() === "" || bannerDescription.trim() === "" || displayAmount.trim() === "" || bannerType.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newBanner = { country, url: bannerUrl, description: bannerDescription, duration: `${displayAmount} ${displayUnit}`, audience: targetAudience, type: bannerType };

    if (editingIndex !== null) {
      // Edit existing banner
      const updatedBanners = banners.map((banner, index) => (index === editingIndex ? newBanner : banner));
      setBanners(updatedBanners);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new banner
      setBanners([...banners, newBanner]);
    }

    resetFields();
  };

  const resetFields = () => {
    setBannerUrl("");
    setBannerDescription("");
    setDisplayAmount("");
    setBannerType("");
    setTargetAudience("All Users");
    setDisplayUnit("days");
  };

  const deleteBanner = (index) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  const editBanner = (index) => {
    const bannerToEdit = banners[index];
    setBannerUrl(bannerToEdit.url);
    setBannerDescription(bannerToEdit.description);
    setDisplayAmount(bannerToEdit.duration.split(" ")[0]); // Get the amount
    setDisplayUnit(bannerToEdit.duration.split(" ")[1]); // Get the unit
    setTargetAudience(bannerToEdit.audience);
    setBannerType(bannerToEdit.type);
    setEditingIndex(index); // Set the index of the banner being edited
  };

  const previewBanner = (banner) => {
    Alert.alert("Preview Banner", `Country: ${banner.country}\nURL: ${banner.url}\nDescription: ${banner.description}\nDuration: ${banner.duration}\nAudience: ${banner.audience}\nType: ${banner.type}`);
  };

  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.sectionTitle}>Manage Banners</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Banner URL"
        value={bannerUrl}
        onChangeText={setBannerUrl}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Banner Description"
        value={bannerDescription}
        onChangeText={setBannerDescription}
      />

      <View style={styles.durationContainer}>
        <TextInput
          style={styles.input}
          placeholder="Display Amount"
          value={displayAmount}
          onChangeText={setDisplayAmount}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={displayUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setDisplayUnit(itemValue)}
        >
          <Picker.Item label="Days" value="days" />
          <Picker.Item label="Hours" value="hours" />
          <Picker.Item label="Minutes" value="minutes" />
          <Picker.Item label="Seconds" value="seconds" />
        </Picker>
      </View>

      <View style={styles.audienceContainer}>
        <Text style={styles.label}>Target Audience:</Text>
        <Picker
          selectedValue={targetAudience}
          style={styles.picker}
          onValueChange={(itemValue) => setTargetAudience(itemValue)}
        >
          <Picker.Item label="All Users" value="All Users" />
          <Picker.Item label="New Users" value="New Users" />
          <Picker.Item label="Returning Users" value="Returning Users" />
          <Picker.Item label="VIP Users" value="VIP Users" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Banner Type"
        value={bannerType}
        onChangeText={setBannerType}
      />

      <View style={styles.countryButtons}>
        <TouchableOpacity style={styles.button} onPress={() => { setCountry("UG"); uploadBanner(); }}>
          <Text style={styles.buttonText}>{editingIndex !== null ? "Update Uganda Banner" : "Upload Uganda Banner"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { setCountry("RW"); uploadBanner(); }}>
          <Text style={styles.buttonText}>{editingIndex !== null ? "Update Rwanda Banner" : "Upload Rwanda Banner"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.bannersList}>
        {banners.map((banner, index) => (
          <View key={index} style={styles.bannerItem}>
            <Image source={{ uri: banner.url }} style={styles.bannerImage} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerText}>{banner.country}: {banner.url}</Text>
              <Text style={styles.bannerDescription}>{banner.description}</Text>
              <Text style={styles.bannerDuration}>Duration: {banner.duration}</Text>
              <Text style={styles.bannerAudience}>Audience: {banner.audience}</Text>
              <Text style={styles.bannerType}>Type: {banner.type}</Text>
            </View>
            <TouchableOpacity style={styles.previewButton} onPress={() => previewBanner(banner)}>
              <Text style={styles.previewButtonText}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => editBanner(index)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBanner(index)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
    width: 900, // Set width to match other containers
    alignSelf: "center", // Center the container
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 10, 
    width: "80%", 
    alignSelf: "center" // Center the input field
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  audienceContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "80%",
    alignSelf: "center",
  },
  countryButtons: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 10 
  },
  bannersList: { marginTop: 10 },
  bannerItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ddd",
    width: "80%", 
    alignSelf: "center", // Center the banner items
    flexDirection: "row", // Align image and text horizontally
    alignItems: "center", // Center items vertically
  },
  bannerImage: {
    width: 100, // Set a fixed width for the banner image
    height: 60, // Set a fixed height for the banner image
    borderRadius: 5,
    marginRight: 10, // Space between image and text
  },
  bannerTextContainer: {
    flex: 1, // Allow text to take remaining space
  },
  bannerText: {
    fontSize: 14,
  },
  bannerDescription: {
    fontSize: 12,
    color: "#666", // Lighter color for description
  },
  bannerDuration: {
    fontSize: 12,
    color: "#666", // Lighter color for duration
  },
  bannerAudience: {
    fontSize: 12,
    color: "#666", // Lighter color for audience
  },
  bannerType: {
    fontSize: 12,
    color: "#666", // Lighter color for banner type
  },
  button: {
    backgroundColor: "#F9622C", // Button color
    padding: 10,
    borderRadius: 5,
    flex: 1, // Allow buttons to take equal space
    marginHorizontal: 5, // Space between buttons
    alignItems: "center", // Center text in button
  },
  buttonText: {
    color: "#fff", // Text color for buttons
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF4D4D", // Red color for delete button
    padding: 5,
    borderRadius: 5,
    marginLeft: 10, // Space between text and delete button
  },
  deleteButtonText: {
    color: "#fff", // Text color for delete button
    fontWeight: "bold",
  },
  previewButton: {
    backgroundColor: "#4CAF50", // Green color for preview button
    padding: 5,
    borderRadius: 5,
    marginLeft: 10, // Space between text and preview button
  },
  previewButtonText: {
    color: "#fff", // Text color for preview button
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFA500", // Orange color for edit button
    padding: 5,
    borderRadius: 5,
    marginLeft: 10, // Space between text and edit button
  },
  editButtonText: {
    color: "#fff", // Text color for edit button
    fontWeight: "bold",
  },
});

export default BannerSection;