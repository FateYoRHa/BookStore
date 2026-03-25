import * as adminAuthorService from "../../../services/admin/core/admin_author_services.js";

export async function getAdminAuthors(req, res) {
  try {
    const authors = await adminAuthorService.getAdminAuthorsService();
    res.status(200).json(authors);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error." });
  }
}
export async function getAdminAuthorsList(req, res) {
  try {
    const authors = await adminAuthorService.getAdminAuthorsServiceList();
    res.status(200).json(authors);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error." });
  }
}

export async function addAuthor(req, res) {
  try {
    const { image, penName, bio } = req.body;
    const newAuthor = await adminAuthorService.addAuthorService({
      image,
      penName,
      bio,
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Error adding author", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAuthor(req, res) {
  try {
    const { image, penName, bio } = req.body;
    const authorCode = req.params.id;
    const author = await adminAuthorService.updateAuthorService({
      authorCode,
      image,
      penName,
      bio,
    });

    res.status(200).json(author);
  } catch (error) {
    console.log("Error updating author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function removeAuthor(req, res) {
  try {
    await adminAuthorService.removeAuthorService(req.params.id);
    res.status(200).json({ message: "Author was removed successfully" });
  } catch (error) {
    console.log("Error removing author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
export async function restoreAuthor(req, res) {
  try {
    await adminAuthorService.restoreAuthorService(req.params.id);
    res.status(200).json({ message: "Author was restored successfully" });
  } catch (error) {
    console.log("Error restoring author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
