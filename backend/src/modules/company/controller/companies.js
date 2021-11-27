import CompanyDetails from "../../../db/models/mongo/companyDetails.js";

class CompanyController {
	create = async (req, res) => {
		try {
			const newCompany = new CompanyDetails({
				companyName: req.body.companyName,
				websiteUrl: req.body.websiteUrl,
				companySize: req.body.companySize,
				companyType: req.body.companyType,
				revenue: req.body.revenue,
				headquarters: req.body.headquarters,
				industry: req.body.industry,
				founded: req.body.founded,
				missionAndVision: req.body.missionAndVision,
				ceoName: req.body.ceoName,
				averageRating: req.body.averageRating,
				companyLocation: req.body.companyLocation,
			});
			const response = await newCompany.save();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	postFeaturedReview = async (req, res) => {
		try {
			const response = await CompanyDetails.updateOne(
				{ companyId: req.body.companyId },
				{ $push: { featuredReviews: { reviewId: req.body.reviewId } } }
			);
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	getAllCompanies = async (req, res) => {
		try {
			const response = await CompanyDetails.find();
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};

	top5CompaniesByAverageRating = async (req, res) => {
		try {
			const companies = await CompanyDetails.find()
				.sort({ averageRating: -1 })
				.limit(5);
			let response = [];
			for (let i = 0; i < companies.length; i++) {
				response.push({
					companyName: companies[i].companyName,
					averageRating: companies[i].averageRating,
				});
			}
			res.status(200).send(response);
		} catch (err) {
			console.error(err);
		}
	};
}

export default CompanyController;