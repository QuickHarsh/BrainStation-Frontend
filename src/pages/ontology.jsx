import { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { getOntology } from "@/service/ontology";

const Ontology = ({ lectureId }) => {
  const refSvg = useRef(null);
  const refMm = useRef(null);
  const transformer = new Transformer();

  useEffect(() => {
    const data = {
      userId: "66d97b6fc30a1f78cf41b620",
      lectureId: lectureId
    };

    const getOntologyData = async () => {
      console.log(lectureId);
      const markdownData = await getOntology(data);

      if (refMm.current) return;
      const mm = Markmap.create(refSvg.current);
      refMm.current = mm;

      const { root } = transformer.transform(markdownData); // Transform the fetched markdown content
      refMm.current.setData(root);
      refMm.current.fit();
    };

    getOntologyData();
  }, [lectureId]);

  return (
    <div>
      <svg ref={refSvg} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default Ontology;
