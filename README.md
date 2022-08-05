# Marketplace
This project is created by me for the SoftUni React Course. 
It represents a mixture between social media and an online marketplace, where users can create and delete marketplaces, where other users can sell orbuy products. 
## Pages restricted for non-registered users
<ul>
    <li> <strong>Dynamic Home Page</strong> ( You can access or create marketplaces here ).
    <li> <strong>Dynamic Profile Page </strong> ( You can change your profile and cover picture. You can see other people's marketplaces and products. You can give rating and reviews for other users. You can do all sorts of CRUD operations relating to your products or marketplaces).
    <li> <strong>Dynamic Marketplace Page</strong> ( You can give rating and leave a review for the marketplace. You can add or remove your products from the marketplace).
    <li> <strong>Dynamic Product Page </strong>( You can give rating or leave review for a product. You can edit or delete your products.)
    <li> <strong>Dynamic Cart / Checkout Page </strong>( You can control the products in your cart before finishing your order.)
</ul>

## Pages not restricted for non-registered users

<ul>
    <li> Login Page </li>
    <li> Register Page </li>
</ul>
<br></br>

# Backend Structure

The project's backend is hosted on a local node + express server. I utilized MongoDB for my database. 

## Database Structure
<ul>
    <li> Marketplace Schema </li>
    <li> Product Schema </li>
    <li> User Schema </li>
    <li> Review Schema </li>
</ul>

## Services 
<ul>
    <li> Marketplace Services ( CRUD operations related to the marketplaces ) </li>
    <li> Product Services ( CRUD operations related to the products ) </li>
    <li> User Services ( CRUD operations related to the users ) </li>
</ul>
<br></br>

# Profile Page
## The profile page includes 3 sections:
<ul>
    <li> Products </li>
    <li> Reviews </li>
    <li> Marketplaces </li>
</ul>
In addition to those sections, you can also rate other users using the stars on the right side of the profile page username.
If you're visitng your profile page you can change your profile and cover picture.
<br></br>

# Marketplace Page
## The marketplace page includes 2 sections:
<ul>
    <li> Products </li>
    <li> Reviews </li>
</ul>
You can add and rate reviews about the specified marketplace. In addition, you can also rate other users' reviews about the marketplace.
<br></br>

# Product Page
Here you can see details about the product you've selected - its price, description, the user that created and uploaded it, etc.
You can also leave reviews about the product and also give it a rating using the star rating system !

# Checkout Page / Cart page
Here you can see and control your cart:
<ul>
    <li> 
        You can remove a product from your cart or remove them all at once. 
    </li>
    <li>
        You can see how much money your order will cost
    </li>
    <li> You can finish your order all with a single button click. </li>
</ul>  

# Technology Stack
<ul>
    <li> Material UI </li>
    <li> React </li>
    <li> HTML, CSS, JS</li>
    <li> SCSS </li>
    <li> NodeJS, ExpressJS </li>
    <li> MongoDB, Mongoose </li>
    <li> Bcrypt </li>
    <li> Axios </li>
    <li> Multer </li>
</ul>
