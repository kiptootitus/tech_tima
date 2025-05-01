import jenkins.model.*
import hudson.plugins.git.*
import hudson.model.*
import org.jenkinsci.plugins.workflow.job.*
import org.jenkinsci.plugins.workflow.cps.*
import hudson.plugins.git.extensions.impl.*

def jenkins = Jenkins.instance
def jobName = "jenkins_tutorial"

if (jenkins.getItem(jobName) == null) {
    println "🔧 Creating pipeline job: ${jobName}"

    // Git SCM configuration
    def scm = new GitSCM("https://github.com/kiptootitus/jenkins_tutorial.git")
    scm.branches = [new BranchSpec("*/main")]  // 👈 Explicitly define the branch!
    scm.extensions.add(new CleanBeforeCheckout())

    // Create pipeline from Jenkinsfile in repo
    def flowDefinition = new CpsScmFlowDefinition(scm, "Jenkinsfile")
    flowDefinition.setLightweight(true)

    def pipelineJob = jenkins.createProject(WorkflowJob, jobName)
    pipelineJob.setDefinition(flowDefinition)
    pipelineJob.save()

    println "✅ Job '${jobName}' created successfully."
} else {
    println "⚠️ Job '${jobName}' already exists. Skipping creation."
}
