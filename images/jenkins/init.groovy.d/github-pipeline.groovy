// import jenkins.model.*
// import hudson.plugins.git.*
// import hudson.model.*
// import org.jenkinsci.plugins.workflow.job.*
// import org.jenkinsci.plugins.workflow.cps.*
// import hudson.plugins.git.extensions.impl.*

// def jenkins = Jenkins.instance
// def jobName = "tech_tima_pipeline"

// if (jenkins.getItem(jobName) == null) {
//     println "🔧 Creating pipeline job: '${jobName}'"

//     try {
//         def scm = new GitSCM("https://github.com/kiptootitus/tech_tima.git")
//         scm.branches = [new BranchSpec("*/dev")]
//         scm.extensions.add(new CleanBeforeCheckout())

//         def flowDefinition = new CpsScmFlowDefinition(scm, "Jenkinsfile")
//         flowDefinition.setLightweight(true)

//         def pipelineJob = jenkins.createProject(WorkflowJob, jobName)
//         pipelineJob.setDefinition(flowDefinition)
//         pipelineJob.setDisplayName("🌱 Tech Tima Pipeline")
//         pipelineJob.save()

//         println "✅ Job '${jobName}' created successfully."
//     } catch (Exception e) {
//         println "❌ Failed to create job '${jobName}': ${e.message}"
//     }

// } else {
//     println "⚠️ Job '${jobName}' already exists. Skipping creation."
// }
