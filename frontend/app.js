document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

// listner for reviews
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("button");
  const post = document.querySelector(".post");
  const reviews = document.querySelector(".reviews");

  const commentForm = document.getElementById("commentForm");
  const commentTextarea = document.querySelector(".textarea textarea");
  const nameArea = document.querySelector(".name textarea");

  const starLabels = document.querySelectorAll(".reviews label");

  let selectedStar = 0;

  starLabels.forEach((label) => {
    label.addEventListener("click", () => {
      selectedStar = parseInt(label.getAttribute("for").split("-")[1]);
    });
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = commentTextarea.value;
    const name = nameArea.value;
    console.log("Star Rating:", selectedStar);
    console.log("Comment:", comment);
    console.log("Name:", name);

    const formData = {
      rating: selectedStar,
      comment: comment,
      name: name,
    };

    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("Review submitted successfully!");

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });

    reviews.style.display = "none";
    post.style.display = "block";
  });
});

window.onload = async () => {
  try {
    const response = await fetch("/data");
    const data = await response.json();

    if (response.ok) {
      const testimonialBoxContainer = document.querySelector(
        ".testimonial-box-container"
      );

      data.forEach((item) => {
        const testimonialBox = document.createElement("div");
        testimonialBox.classList.add("testimonial-box");

        const boxTop = document.createElement("div");
        boxTop.classList.add("box-top");

        // Profile Section
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const profileImgDiv = document.createElement("div");
        profileImgDiv.classList.add("profile-img");

        const profileImg = document.createElement("img");
        profileImg.src = "img/reviews-icon.jpg"; // Assuming each data item has a profile image URL property
        profileImgDiv.appendChild(profileImg);

        const nameUserDiv = document.createElement("div");
        nameUserDiv.classList.add("name-user");

        const nameStrong = document.createElement("strong");
        nameStrong.textContent = item.name; // Assuming each data item has a name property
        nameUserDiv.appendChild(nameStrong);

        profileDiv.appendChild(profileImgDiv);
        profileDiv.appendChild(nameUserDiv);

        // Reviews Section
        const reviewsDiv = document.createElement("div");
        reviewsDiv.classList.add("reviews");

        for (let i = 0; i < item.rating; i++) {
          const starIcon = document.createElement("i");
          starIcon.classList.add("fas", "fa-star");
          reviewsDiv.appendChild(starIcon);
        }

        boxTop.appendChild(profileDiv);
        boxTop.appendChild(reviewsDiv);
        testimonialBox.appendChild(boxTop);

        // Comments Section
        const clientCommentDiv = document.createElement("div");
        clientCommentDiv.classList.add("client-comment");

        const commentP = document.createElement("p");
        commentP.textContent = item.comment; // Assuming each data item has a comment property
        clientCommentDiv.appendChild(commentP);

        testimonialBox.appendChild(clientCommentDiv);

        testimonialBoxContainer.appendChild(testimonialBox);
      });
    } else {
      console.error("Error fetching data:", data);
      alert("Error fetching data. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
};
