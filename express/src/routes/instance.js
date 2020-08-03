import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const instances = await req.context.models.Instance.find().populate(
    "flavour"
  );
  return res.send(instances);
});

router.get("/:instanceId", async (req, res) => {
  const instances = await req.context.models.Instance.findById(
    req.params.instanceId
  ).populate("flavour");
  return res.send(instances);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const instance = await req.context.models.Instance.create({
    name: req.body.name,
    description: "",
    flavour: req.body.flavour,
    datasets: [],
    user: req.body.user,
  });

  return res.send(instance);
});

router.patch("/:instanceId", async (req, res) => {
  const instance = await req.context.models.Instance.findById(
    req.params.instanceId,
    (err, instance) => {
      for (const field of req.body) {
        instance[field] = req.body[field];
      }
    }
  );
  instance.save();
  return res.send(instance);
});

router.post("/:instanceId/dataset/:datasetId", async (req, res) => {
  const instance = await req.context.models.Instance.findById(
    req.params.instanceId
  );

  // instance.datasets.push(req.params.datasetId);
  const updatedDatasets = [...instance.datasets, req.params.datasetId];
  instance.datasets = updatedDatasets;
  instance.save();
  return res.send(instance);
});

router.delete("/:instanceId/dataset/:datasetId", async (req, res) => {
  console.log("recieved request to remove things");
  console.log(
    `instance: ${req.params.instanceId}, dataset: ${req.params.datasetId}`
  );
  const instance = await req.context.models.Instance.findById(
    req.params.instanceId
  );
  instance.datasets = instance.datasets.filter(
    (i) => i !== req.params.datasetId
  );
  instance.save();
  return res.send(instance);
});

router.delete("/:instanceId", async (req, res) => {
  const instance = await req.context.models.Instance.findById(
    req.params.instanceId
  );
  const result = await instance.remove();
  return res.send(result);
});

export default router;
